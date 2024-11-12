import { Link } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";

const CartPreview = ({ cartCount = 0 }) => {
  // Sample cart items - replace with actual cart data
  const cartItems = [
    { id: 1, name: 'Classic Tote', price: 79.99, image: '/placeholder.svg' },
    { id: 2, name: 'Summer Tote', price: 59.99, image: '/placeholder.svg' },
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 bg-background rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <div className="text-center py-6">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
              </div>
              <Link
                to="/cart"
                className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPreview;
