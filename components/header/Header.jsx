import React from "react";
import classes from "./Header.module.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className={classes.header}>
      <Navbar />
      <div className={classes.middle}>
        <h3>HEADPHONE PRO</h3>
        <h1>And then the pro comes</h1>
        <p>Lorem ipsum dolor sitiua quae excepturi explicabo.</p>
        <p>Starting from $1899</p>
        <button>SHOP NOW</button>
      
      </div>
    </div>
  );
};

export default Header;
