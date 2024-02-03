import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.models.User || mongoose.model('User', {
    username: String,
    email: String,
    password: String,
  });


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Replace 'YourUserModel' with your actual user model name or logic
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ error: "Login failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
