const data = require("../models/dataModel");

function getProducts(req, res) {
  res.json(data.products);
}

function getProductById(req, res) {
  const product = data.products.find(
    (item) => item.id === Number(req.params.id),
  );
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
}

function createProduct(req, res) {
  const { name, description, price } = req.body;
  if (!name || typeof price !== "number") {
    return res
      .status(400)
      .json({ error: "Product name and numeric price are required" });
  }

  const newProduct = {
    id: data.nextProductId++,
    name,
    description: description || "",
    price,
  };

  data.products.push(newProduct);
  res.status(201).json(newProduct);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
