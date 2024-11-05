import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminProducts = () => {
  const [products] = useState([
    { id: 1, name: "Product 1", price: 99.99 },
    { id: 2, name: "Product 2", price: 149.99 },
  ]);

  const handleDelete = (id) => {
    toast.success(`Product ${id} deleted successfully`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button onClick={() => toast.info("Add product clicked")}>
          Add Product
        </Button>
      </div>
      
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => toast.info(`Edit ${product.name}`)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(product.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;