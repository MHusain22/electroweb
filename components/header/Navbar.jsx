import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import cart from "../../images/cart.png";
import { useSelector, useDispatch } from "react-redux";
import { IoMenu } from "react-icons/io5";
import { login, logout, setUser } from "@/store/slices/authSlice.js";
import { useRouter } from "next/router";
import { auth } from "../firebase";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { data: session, status } = useSession();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { totalQuantity } = useSelector((state) => state.cart);
  // console.log(session.user);
  const [collapse, setCollapse] = useState(classes.resp);
  const [userGoogle, setUserGoogle] = useState(null);
  // useEffect(() => {
  //   if (status === "authenticated" && session) {
  //     dispatch(setUser(session.user.name));
  //     dispatch(login());
  //   }
  // }, [status, session, dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserGoogle(user);
        dispatch(setUser(user.displayName));
      } else {
        setUserGoogle(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    setCollapse((prevState) =>
      prevState === classes.resp ? classes.resp_collapse : classes.resp
    );
  };

  const handleLogin = () => {
      dispatch(login());
      router.push("/");
       };

  const handleLogout =  async() => {
    dispatch(logout());
    await auth.signOut();
    router.push("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>ELECTRO</div>
      <IoMenu size={45} className={classes.menu} onClick={handleClick} />
      <div className={collapse}>
        <div className={classes.nav}>
          <ul>
            <Link href="/">
              <li>HOME</li>
            </Link>
            <Link href="/shop" style={{ textDecoration: "none", color: "inherit" }}>
              <li>SHOP</li>
            </Link>
            <Link href="/about">
              <li>ABOUT</li>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none", color: "inherit" }}>
              <li>CONTACT</li>
            </Link>
          </ul>
        </div>
        <hr className={classes.line} />
        <div className={classes.last}>
          {userGoogle || isAuthenticated ? (
            <div className={classes.profileSection}>
              {userGoogle?.photoURL && 
                    <Image
                      src={userGoogle.photoURL}
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      className={classes.profileImage}
                    />
                  }
                {/* {userGoogle?.displayName &&  <p className={classes}>{userGoogle.displayName}</p>} */}
                {isAuthenticated &&  <p className={classes}>{user}</p>}
              
              <p className={classes.log} onClick={handleLogout}>
                Logout
              </p>
            </div>
          ) : (
            <div className={classes.profileSection}>
              <Link href="/login">
                <p className={classes.log} onClick={handleLogin}>
                  LOGIN
                </p>
              </Link>
              <Link href="/signup">
                <p className={classes.log}>SIGNUP</p>
              </Link>
            </div>
          )}
          <Link href="/cart">
            <div className={classes.crt}>
              <Image className={classes.cart} src={cart} alt="cartimage" />
              <span className={classes.item}>{totalQuantity}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
