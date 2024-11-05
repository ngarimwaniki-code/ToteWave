import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to complete your order");
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        items: state.items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total_amount: state.total.toString(),
        shipping_address: shippingAddress,
      };

      const order = await createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/orders/${order.id}`);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              placeholder="Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;