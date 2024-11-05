import { Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const Deals = () => {
  const dealsProducts = products.map(product => ({
    ...product,
    originalPrice: product.price,
    price: Number((product.price * 0.8).toFixed(2)), // 20% off
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Special Deals</h1>
      </div>

      <div className="bg-primary/10 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Summer Sale!</h2>
        <p className="text-gray-600">Get 20% off on all products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealsProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded">
                20% OFF
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary font-medium">
                  ${product.price}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.originalPrice}
                </span>
              </div>
              <Button className="w-full">
                Shop Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;