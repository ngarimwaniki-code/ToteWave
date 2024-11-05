from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, ProductVariant, ProductImage, Review, Wishlist
from .serializers import (
    CategorySerializer, ProductSerializer, ProductVariantSerializer,
    ProductImageSerializer, ReviewSerializer, WishlistSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price', 'stock', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'stock']

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product', 'color', 'size', 'price']
    
    def get_queryset(self):
        product_id = self.request.query_params.get('product', None)
        if product_id is not None:
            return self.queryset.filter(product_id=product_id)
        return self.queryset

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        product_variant_id = self.request.query_params.get('product_variant', None)
        if product_variant_id is not None:
            return self.queryset.filter(product_variant_id=product_variant_id)
        return self.queryset

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        product_id = self.request.query_params.get('product', None)
        if product_id is not None:
            return self.queryset.filter(product_id=product_id)
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Associate review with the user

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Check if the user is authenticated before filtering
        if self.request.user.is_authenticated:
            return Wishlist.objects.filter(user=self.request.user)
        return Wishlist.objects.none()  # Return an empty queryset if user is not authenticated

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        wishlist_item = self.get_object()
        if wishlist_item.user == self.request.user:
            serializer.save()
        else:
            raise PermissionDenied("You do not have permission to update this item.")

    def perform_destroy(self, instance):
        if instance.user == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to delete this item.")
