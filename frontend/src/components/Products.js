import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "@/services/api";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Filter, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    price: "",
    is_active: true
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters)
  });

  const { addItem } = useCart();

  if (productsLoading || categoriesLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1,2,3,4,5,6].map(i => (
        <Card key={i}>
          <Skeleton className="h-48 w-full" />
          <CardContent className="mt-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="max-w-xs"
        />
        <Select 
          value={filters.category}
          onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories?.results.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productsData?.results.map((product) => (
          <Card key={product.id}>
            {product.image && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${Number(product.price).toFixed(2)}</p>
              <p className="text-muted-foreground mt-2">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => addItem(product)}
                disabled={!product.is_active || product.stock === 0}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;