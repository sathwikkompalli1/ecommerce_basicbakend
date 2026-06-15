const data = {
  products: [
    { id: 1, name: "Laptop", description: "Lightweight laptop", price: 999.99 },
    {
      id: 2,
      name: "Smartphone",
      description: "5G-enabled phone",
      price: 699.99,
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling headphones",
      price: 199.99,
    },
  ],
  users: [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ],
  orders: [
    {
      id: 1,
      userId: 1,
      items: [
        { productId: 1, quantity: 1 },
        { productId: 3, quantity: 2 },
      ],
      createdAt: new Date().toISOString(),
    },
  ],
  nextProductId: 4,
  nextUserId: 3,
  nextOrderId: 2,
};

module.exports = data;
