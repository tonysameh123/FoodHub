const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  {
    name: "Margherita Pizza",
    category: "Pizza",
    price: 120,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil.",
    rating: 4.7
  },
  {
    name: "Cheese Burger",
    category: "Burgers",
    price: 85,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    description: "Juicy beef patty with melted cheddar and special sauce.",
    rating: 4.8
  },
  {
    name: "Chicken Shawarma",
    category: "Sandwiches",
    price: 65,
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400",
    description: "Marinated chicken wrapped in pita with garlic sauce.",
    rating: 4.6
  },
  {
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 140,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    description: "Loaded with spicy pepperoni and mozzarella cheese.",
    rating: 4.9
  },
  {
    name: "Caesar Salad",
    category: "Salads",
    price: 70,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    description: "Fresh romaine lettuce with Caesar dressing and croutons.",
    rating: 4.4
  },
  {
    name: "Pasta Alfredo",
    category: "Pasta",
    price: 95,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400",
    description: "Creamy Alfredo sauce with grilled chicken.",
    rating: 4.5
  },
  {
    name: "Chocolate Cake",
    category: "Desserts",
    price: 50,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    description: "Rich chocolate cake with ganache topping.",
    rating: 4.8
  },
  {
    name: "French Fries",
    category: "Sides",
    price: 35,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
    description: "Crispy golden fries with ketchup and mayo.",
    rating: 4.3
  }
];

const seedDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected!');

    console.log('🗑️  Deleting old products...');
    await Product.deleteMany();
    console.log('✅ Products cleared');

    console.log('🗑️  Deleting old users...');
    await User.deleteMany();
    console.log('✅ Users cleared');

    console.log('🍔 Adding products...');
    const created = await Product.insertMany(products);
    console.log('✅ ' + created.length + ' products added!');

    console.log('👤 Creating admin...');
    await User.create({
      name: 'Admin',
      email: 'admin@foodhub.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin created: admin@foodhub.com / admin123');

    console.log('👤 Creating test user...');
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      role: 'customer'
    });
    console.log('✅ User created: user@test.com / user123');

    console.log('\n🎉 Done! Database seeded!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDB();