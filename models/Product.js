import mongoose from "mongoose";

const Product =  //capital I in Image productData.js
  mongoose.models.Product ||
  mongoose.model("Product", {
    name: String,
    image: String,
    category: String,
    company: String,
    price: Number,
    quantity: Number,
    description: String,
  });

module.exports = Product;