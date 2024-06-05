import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const User = mongoose.models.User || mongoose.model('User', {
    username: String,
    email: String,
  });
  
  export default async function handler(req, res){
    if (req.method === "POST"){
      const { displayName, email } = req.body;
      try {
        const user = new User({ username:displayName, email });
        await user.save();
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }