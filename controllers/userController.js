const data = require("../models/dataModel");

function getUsers(req, res) {
  res.json(data.users);
}

function getUserById(req, res) {
  const user = data.users.find((item) => item.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
}

function createUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "User name and email are required" });
  }

  const newUser = {
    id: data.nextUserId++,
    name,
    email,
  };

  data.users.push(newUser);
  res.status(201).json(newUser);
}

function getOrdersByUserId(req, res) {
  const userId = Number(req.params.id);
  const user = data.users.find((item) => item.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userOrders = data.orders
    .filter((order) => order.userId === userId)
    .map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: data.products.find((p) => p.id === item.productId) || null,
      })),
    }));

  res.json({ user, orders: userOrders });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getOrdersByUserId,
};
