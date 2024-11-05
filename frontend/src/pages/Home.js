import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";

const FeaturedProduct = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="product-card"
  >
    <div className="relative overflow-hidden group">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Button
          variant="secondary"
          size="lg"
          className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          onClick={() => toast.success("Added to cart!")}
        >
          Add to Cart
          <ShoppingBag className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
    </div>
  </motion.div>
);

const Hero = () => (
  <div className="relative h-[70vh] bg-gradient-to-r from-primary-900 to-primary-700 text-white">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-black/30" />
      <img
        src="https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80"
        alt="Hero"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative container mx-auto h-full flex items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-6">Discover Our Premium Tote Collection</h1>
        <p className="text-xl mb-8">Handcrafted with care, designed for your lifestyle.</p>
        <Button size="lg" variant="secondary" className="group">
          Shop Now
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', { featured: true }],
    queryFn: () => productService.getProducts({ featured: true, limit: 3 }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="page-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">Featured Products</h2>
          <Button
            variant="outline"
            onClick={() => navigate("/products")}
            className="group"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <FeaturedProduct key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-primary-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-gray-600">Crafted with the finest materials for lasting durability</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Sustainable</h3>
              <p className="text-gray-600">Eco-friendly materials and responsible manufacturing</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $100</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;