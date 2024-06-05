import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {name, category, company,image, price, description} = req.body;
    try {
      const product = await Product({name,image,category,company,price,description,quantity: 1,});
      await product.save();
      res.status(200).json({ message: "Product successful saved" });
    } catch (error) {
      console.error("req failed:", error);
      res.status(500).json({ error: "req failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const product = await Product.find();
      return res.status(200).json({product});
    } catch (error) {
      console.error("Cannot get Product Data", error);
      res.status(500).json({ error: "Cannot get Product Data" });
    }
  }
}
