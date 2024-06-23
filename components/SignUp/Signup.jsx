import React, { useState } from "react";
import classes from "./Signup.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    const { email, password, username } = user;

    if (email.length > 0 && password.length > 0 && username.length > 0) {
      // alert("correct");
      try {
        const response = await axios.post('/api/users/signup', user) //passing the data
        console.log("Signup Success", response.data);
        router.push("/login");
        toast.success("SignUp succesfull");
      } catch (error) {
        toast.error("Signup failed");
        console.log("Signup failed", error.message);
      }
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className={classes.dialog}>
      <Toaster position="top-right" reverseOrder={false} />
      <form method="POST" onSubmit={registerHandler} className={classes.stand}>
        <h1>SignUp</h1>
        <input
          type="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          id=""
          placeholder="Password"
        />
        <button type="submit" className={classes.logbtn}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
