import mongoose from "mongoose";


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User =
  mongoose.models.User ||
  mongoose.model("User", {
    username: String,
    email: String,
    password: String,
  });

export default async function handler(req, res){
    const {id} = req.query;
    console.log(id);
  if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}