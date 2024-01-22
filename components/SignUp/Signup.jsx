import React, { useState } from "react";
import classes from "./Signup.module.css";
import axios from "axios"; //to call api
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();

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

  const registerHandler = (e) => {
    e.preventDefault();
    const { email, password, username } = user;
    console.log(user);
    if (email.length > 0 && password.length > 0 && username.length > 0) {
      // alert("correct");
      axios
        .post("http://localhost:9000/signup", user) //passing the data
        .then((res) => {
          if (res.data == "User already registered") {
            toast.success("User already registered");
            console.log(res);
          } else {
            toast.success("SignUp succesfull");
            router.push("/");
            console.log(res);
          }
        });
    } else {
      toast.error("Invalid Credentials"); 
    }
  };

  return (
    <div className={classes.dialog}>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
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
        {/* <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} id="" placeholder='Re-Enter Password' /> */}
        <button type="submit" className={classes.logbtn}>
          SignUp
        </button>
        <a href="" style={{ textDecoration: "none", color: "inherit" }}>
          Forget password
        </a>
        {/* <p>or sign in with google<span className='gog'><img src={google} width="10%" alt="" /></span></p> */}
      </form>
    </div>
  );
};

export default Signup;
