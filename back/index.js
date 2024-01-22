import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(bodyParser.json());
const port = process.env.PORT || 9000;
app.use(cors({ origin: "http://localhost:3000" }));
const salRounds = 10;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Your code here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // const salt = await bycrptjs.genSalt(10);
  // const hashPassword = await bycrptjs.hash(password, salt);

  // console.log(username,hashPassword);
  // console.log(req.body);
  //checking if the user exist
  await User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        bcrypt.hash(password, salRounds, async (err, hash) => {
          if (err) {
            console.log("Error in hashing password", err);
          } else {
            //creating a user with the model above
            const user = new User({
              username,
              email,
              hash,
            });
            await user
              .save()
              .then((err) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({ message: "Successfully Registered" });
                }
              })
              .catch((error) => {
                // Handle errors during save
                console.error("Error during save:", error);
              });
          }
        });
      }
    })
    .catch((error) => {
      // Handle errors during the query
      console.error("Error during findOne:", error);
    });
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  await User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
          console.log(result);
        });
        if (password === user.password) {
          res.send({ message: "Login Successfully", user: user });
        } else {
          res.send({ message: "Password didn't match" });
        }
      } else {
        res.send("User not is a registered");
      }
    })
    .catch((error) => {
      // Handle errors during the query
      console.error("Error during findOne:", error);
    });
});

app.listen(port, () => {
  console.log(`Server succesfully running on port ${port}`);
});
