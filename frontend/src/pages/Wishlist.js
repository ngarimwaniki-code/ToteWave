import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import productService from "@/services/productService";
import { toast } from "sonner";

const Wishlist = () => {
  const queryClient = useQueryClient();
  
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: productService.getWishlist,
  });

  const removeMutation = useMutation({
    mutationFn: productService.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.success("Item removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove item from wishlist");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.category}</p>
                </div>
                <p className="font-bold">${item.product.price}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.product.description}</p>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeMutation.mutate(item.id)}
                className="ml-auto"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;