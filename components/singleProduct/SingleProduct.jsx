import classes from "./singleProduct.module.css";
import { useRouter } from "next/router";
import { ProductData } from "../ProductData.js";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { WiTime2 } from "react-icons/wi";
import { setIncrease, setDecrease, addToCart } from "@/store/slices/CartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect } from "react";

const SingleProduct = () => {
  const usedispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  //converting string to number with + symbol
  const filteredProduct = ProductData.filter((product) => product.id === +id);

  
  return (
    <div>
      <Link href="/">
      <IoArrowBackOutline size={40} className={classes.arrow}/>
      </Link>
      {filteredProduct.map((product) => (
        <div key={product.id} className={classes.up}>
          <div className={classes.insideLeft}>
            <Image
              src={product.Image}
              alt={product.name}
             // style={{ maxWidth: "100%" }}
            />
          </div>
          <div className={classes.insideRight}>
            <h1 className={classes.heading}>{product.name}</h1>
            <FaStar id="icons" size={30} color="orange" />
            <FaStar id="icons" size={30} color="orange" />
            <FaStar id="icons" size={30} color="orange" />
            <FaStar id="icons" size={30} color="orange" />
            <FaStarHalf id="icons" size={30} color="orange" />
            <p className={classes.para}>MRP {`$${product.price}`}</p>
            <p>{product.description}</p>
            <div className={classes.ds}>
              <div className={classes.icons}>
                <TbTruckDelivery size={50} />
                <p>Free Dilevery</p>
              </div>
              <div className={classes.icons}>
                <TbReplace size={50} />
                <p>Exchange within 30 Days</p>
              </div>
              <div className={classes.icons}>
                <WiTime2 size={50} />
                <p>24/7 customer Service</p>
              </div>
              <div className={classes.icons}>
                <AiOutlineSafetyCertificate size={50} />
                <p>3 year Warranty</p>
              </div>
            </div>
            <p className={classes.para}>
              Available: <span>In Stock</span>
            </p>
            <p className={classes.para}>
              Company: <span>{product.company}</span>
            </p>
            <p className={classes.para}>
              Category: <span>{product.category}</span>
            </p>
            <hr />
            {/* <div className={classes.but}>
              <span onClick={() => usedispatch(setDecrease(product.id))}>-</span>
              <span className={classes.num}>{product.quantity}</span>
              <span onClick={() => inc(product.id)}>+</span>
            </div> */}
            <Link href="/cart" onClick={() => usedispatch(addToCart(product))}>
              <button className={classes.cbtn}>Add To Cart</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleProduct;
