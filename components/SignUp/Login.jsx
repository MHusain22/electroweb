import React, { useState,useEffect } from "react";
import classes from "./Signup.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser,login } from "@/store/slices/authSlice.js";
import { signInWithPopup } from 'firebase/auth';
import { auth,provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";



const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };

  const LoginWthGoogle = async() => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const response = await axios.post('/api/users/google', {
        displayName, email
      });
      console.log(response.data);
      dispatch(login());
      router.push('/'); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    
    if (email.length > 0 && password.length > 0) {
      try {
        const response = await axios.post("api/users/login", user); //passing the data
        console.log("login Success");
        dispatch(setUser(response.data.user.username));
        router.push("/");
        toast.success("login succesfull");
      } catch (error) {
        toast.error("Incorrect Password or Email");
        console.log("login failed", error.message);
      }
    }
  };

  return (
    <div className={classes.dialog}>
      <Toaster position="top-right" reverseOrder={false} />
      <form method="POST" onSubmit={registerHandler} className={classes.stand}>
        <h1>Login</h1>
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
          Login
        </button>
        <button className={classes.logbtn} onClick={LoginWthGoogle}>Login with google <FcGoogle /></button>
        {/* <p>or sign in with google<span className='gog'><img src={google} width="10%" alt="" /></span></p> */}
      </form>
    </div>
  );
};

export default Login;
