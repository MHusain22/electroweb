import React, { useState } from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import cart from "../../images/cart.png";
import { useSelector } from "react-redux";
import { IoMenu } from "react-icons/io5";


const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);

  const [collapse,setCollapse] = useState(classes.resp);

  const handleClick = () => {
    collapse === classes.resp ? setCollapse(classes.resp_collapse) : setCollapse(classes.resp)
  }

  return (
    <div className={classes.container}>
     
      <div className={classes.logo}>ELECTRO</div>
        
        <IoMenu size={45} className={classes.menu} onClick={handleClick}/>
        
      <div className={collapse}>
        <div className={classes.nav}>
          <ul>
            <Link href="/">
              <li>HOME</li>
            </Link>
            <Link
              href="/shop"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>SHOP</li>
            </Link>
            <li>ABOUT</li>
            <li>BLOG</li>
            <Link
              href="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li>CONTACT</li>
            </Link>
          </ul>
        </div>
        <hr  className={classes.line}  />
        <div className={classes.last}>
          <Link href="/login">
            <p className={classes.log}>LOGIN</p>
          </Link>
          <Link href="/signup">
            <p className={classes.log}>SIGNUP</p>
          </Link>
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
