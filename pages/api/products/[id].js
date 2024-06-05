import mongoose from "mongoose";
import Product from '../../../models/Product.js'

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res){
    const {id} = req.query;
    console.log(id);
  if (req.method === "DELETE") {
    console.log(id);
    try {
      // Delete the article from the database
      await Product.findByIdAndDelete(id);
      res.status(204).send(); // Send a 204 No Content response on successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}