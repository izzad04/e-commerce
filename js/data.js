// FASHION PRODUCT DATA
const products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    category: "Men Clothing",
    image: "images/mens_tshirt.jpg",
    stock: 10
  },
  {
    id: 2,
    name: "Women's Blouse",
    category: "Women Clothing",
    image: "images/women_blouse.jpg",
    stock: 3   // LOW STOCK
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Footwear",
    image: "images/sneakersnb.jpg",
    stock: 6
  },
  {
    id: 4,
    name: "Handbag",
    category: "Accessories",
    image: "images/handbag.jpg",
    stock: 2   // LOW STOCK
  },
  {
    id: 5,
    name: "Jeans",
    category: "Men Clothing",
    image: "images/hodie.jpg",
    stock: 8
  },
  {
    id: 6,
    name: "Sneakers",
    category: "Footwear",
    image: "images/shoes_brown.jpg",
    stock: 4   // LOW STOCK
  },
  {
    id: 7,
    name: "Sneakers",
    category: "Mean Clothing",
    image: "images/mens_jacket.jpg",
    stock: 0   // LOW STOCK
  },
  {
    id: 8,
    name: "Spectacles",
    category: "Accessories",
    image: "images/cermin_mata.jpg",
    stock: 5   // LOW STOCK
  },
  {
    id: 9,
    name: "Chain",
    category: "Accessories",
    image: "images/rantai.jpg",
    stock: 0   // LOW STOCK
  }
];

// FASHION CATEGORIES
const categories = [
  { id: 1, name: "Men Clothing" },
  { id: 2, name: "Women Clothing" },
  { id: 3, name: "Footwear" },
  { id: 4, name: "Accessories" }
];

// 1. Weekly Revenue Data (Monday to Sunday)
const revenueData = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  amounts: [1200, 1900, 1500, 2100, 1800, 2500, 2300]
};

// 2. Order Status Data
const orderStats = {
  labels: ['Delivered', 'Pending', 'Cancelled'],
  counts: [45, 15, 5] // 45 Delivered, 15 Pending, 5 Cancelled
};