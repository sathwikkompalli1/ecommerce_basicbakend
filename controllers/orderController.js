const data = require("../models/dataModel");

function enrichOrder(order) {
  return {
    ...order,
    user: data.users.find((user) => user.id === order.userId) || null,
    items: order.items.map((item) => ({
      ...item,
      product:
        data.products.find((product) => product.id === item.productId) || null,
    })),
  };
}

function getOrders(req, res) {
  res.json(data.orders.map(enrichOrder));
}

function getOrderById(req, res) {
  const order = data.orders.find((item) => item.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(enrichOrder(order));
}

function createOrder(req, res) {
  const { userId, items } = req.body;
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Order userId and items are required" });
  }

  const user = data.users.find((item) => item.id === Number(userId));
  if (!user) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  const normalizedItems = [];
  for (const item of items) {
    const product = data.products.find((p) => p.id === Number(item.productId));
    if (!product || typeof item.quantity !== "number" || item.quantity < 1) {
      return res.status(400).json({ error: "Invalid productId or quantity" });
    }
    normalizedItems.push({
      productId: product.id,
      quantity: item.quantity,
    });
  }

  const newOrder = {
    id: data.nextOrderId++,
    userId: user.id,
    items: normalizedItems,
    createdAt: new Date().toISOString(),
  };

  data.orders.push(newOrder);
  res.status(201).json(newOrder);
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
};
