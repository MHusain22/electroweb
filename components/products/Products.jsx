import React from "react";
import classes from "./Products.module.css";
import { ProductData } from "../ProductData.js";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/CartSlice";

const Products = () => {
  const usedispatch = useDispatch();

  const btnpre = () => {
    let box = document.getElementById("productcontainer");

    if (box) {
      let width = box.clientWidth;
      box.scrollLeft = box.scrollLeft - width;
    }
  };

  const btnnext = () => {
    let box = document.getElementById("productcontainer");

    if (box) {
      let width = box.clientWidth;
      box.scrollLeft = box.scrollLeft + width;
    }
  };

  return (
    <div className={classes.products}>
      <div className={classes.smallcontainer}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Top Deals of The Day
        </h2>
        <div className={classes.nava}>
          {ProductData.map((data) => (
            <div key={data.id} className={classes.product_container}>
              <div className={classes.col3} key={data.id}>
                <div className={classes.cen}>
                  <Link href={`${data.id}`}>
                    
                      <Image
                        className={classes.imgg}
                        src={data.Image}
                        alt="image"
                      />
                   
                  </Link>
                </div>
                <Link href="/cart">
                  <button
                    className={classes.cbtn}
                    onClick={() => usedispatch(addToCart(data))}
                  >
                    Add To Cart
                  </button>
                </Link>
                <h6>{data.category}</h6>
                <h3>{data.name}</h3>
                <h3>{`$${data.price}`}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.ad}>
          <div className={classes.text}>
            <h6>SUPER DEAL</h6>
            <h2>APPLE iPhone 15</h2>
            <h2>$1,099</h2>
            <Button>SHOP NOW</Button>
          </div>
        </div>

        <div className={classes.contain}>
          <div className={classes.box}>
            <div className={classes.text2}>
              <h6>TOP DEALS</h6>
              <h2>APPLE 2023</h2>
              <h2>MacBook AIR M2</h2>
              <Button>Shop Now</Button>
              {/* <button className={classes.mac}>SHOP NOW </button> */}
            </div>
          </div>
          {/* carousel */}

          <div className={classes.productcarousel}>
            <button className={classes.prebtn} onClick={btnpre}>
              <p>&lt;</p>
            </button>
            <button className={classes.nextbtn} onClick={btnnext}>
              <p>&gt;</p>
            </button>

            <div id="productcontainer" className={classes.productcontainer}>
              {ProductData.map((data) => (
                <div className={classes.cor}>
                  <Image src={data.Image} alt="" />
                  <h3>{data.name}</h3>
                  <h3>{`$${data.price}`}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.back}>
          <div className={classes.too}>
            <h6 style={{ color: "white" }}>GRAND SALE</h6>
            <h2 style={{ color: "white" }}>APPLE iPhone 13.Get 30% Off!</h2>
            <Button className={classes.sh}>Shop Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
