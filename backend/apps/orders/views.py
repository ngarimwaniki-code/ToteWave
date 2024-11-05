from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import stripe
from .models import Order
from .serializers import OrderSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure that the user is authenticated
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user)
        return Order.objects.none()  # Return an empty queryset for unauthenticated users

    def perform_create(self, serializer):
        # Automatically set the user when creating an order
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def create_payment_intent(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required.'}, status=status.HTTP_403_FORBIDDEN)

        order = self.get_object()

        try:
            intent = stripe.PaymentIntent.create(
                amount=int(order.total_amount * 100),  # Convert to cents
                currency='usd',
                metadata={'order_id': order.id}
            )
            
            order.stripe_payment_intent = intent.id
            order.save()
            
            return Response({
                'clientSecret': intent.client_secret
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )