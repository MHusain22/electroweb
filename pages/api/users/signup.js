import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log(hashedPassword);
      // Create a new user
      const newUser = new User({ username, email, password:hashedPassword });
      await newUser.save();

      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Signup failed:", error);
      res.status(500).json({ error: "Signup failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
