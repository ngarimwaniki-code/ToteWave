import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders] = useState([
    { id: 1, customer: "John Doe", total: 299.99, status: "Pending" },
    { id: 2, customer: "Jane Smith", total: 199.99, status: "Shipped" },
  ]);

  const handleStatusUpdate = (id, status) => {
    toast.success(`Order ${id} status updated to ${status}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Order #{order.id}</h3>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded">
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Customer: {order.customer}</p>
            <p className="text-sm text-gray-600 mb-4">Total: ${order.total}</p>
            <div className="space-x-2">
              <Button 
                variant="outline"
                onClick={() => handleStatusUpdate(order.id, "Shipped")}
              >
                Mark as Shipped
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleStatusUpdate(order.id, "Delivered")}
              >
                Mark as Delivered
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;