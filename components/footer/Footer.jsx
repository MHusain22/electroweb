import React from "react";
import classes from "./Footer.module.css";
// import ps from '../../images/play-store.png';
// import as from '../../images/app-store.png';
import Image from "next/image";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.download_app}>
        <h3>Download Our App</h3>
        <p>Downlaod App for andriod and ios phone</p>
        <div className={classes.app_logo}>
          {/* <Image src={ps} alt="playstrore" />
                    <Image src={as} alt="appstore" /> */}
        </div>
      </div>
      <div className={classes.fl}>
      <div className={classes.footer_links}>
        <h3>Useful Links</h3>
        <ul>
          <li>Coupons</li>
          <li>Blog Post</li>
          <li>Return Policy</li>
          <li>Join Affiliate</li>
        </ul>
      </div>
      <div className={classes.footer_social}>
        <h3>Follow Us</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>YouTube</li>
        </ul>
      </div>
      </div>
      <p className={classes.copyr}>CopyRight</p>
    </div>
  );
};

export default Footer;
