import React from "react";
import classes from "./Footer.module.css";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaAppStoreIos } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.download_app}>
          <h3>Download Our App</h3>
          <p>Downlaod App for andriod and ios phone</p>
          <div className={classes.app_logo}>
            <BiLogoPlayStore size={50} />
            <FaAppStoreIos size={50} />
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
      <div className={classes.chatbot}>
        {/* <iframe
          src="https://www.chatbase.co/chatbot-iframe/K_vhNWwE5TH19H3pld0KM"
          title="Chatbot"
          width="100%"
          
          // style="height: 100%; min-height: 700px"
          style={{height:"200%"}}
          frameborder="0"
        ></iframe> */}
      </div>
      </div>
    </>
  );
};

export default Footer;
