// Category object structure
const Category = {
    id: null,
    name: '',
    slug: '',
    description: '' // optional
  };
  
  // Product object structure
  const Product = {
    id: null,
    category: Category,
    category_id: null,
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: null,
    image: '', // optional
    is_active: true,
    created_at: '',
    updated_at: ''
  };
  
  // OrderItem object structure
  const OrderItem = {
    id: null, // optional
    product: Product,
    product_id: null,
    quantity: null,
    price: ''
  };
  
  // Order object structure
  const Order = {
    id: null, // optional
    user: null, // optional
    status: 'pending', // default value
    total_amount: '',
    shipping_address: '',
    payment_status: false, // optional
    stripe_payment_intent: '', // optional
    items: [OrderItem],
    created_at: '', // optional
    updated_at: '' // optional
  };
  
  // CartItem object structure
  const CartItem = {
    product: Product,
    quantity: null
  };
  