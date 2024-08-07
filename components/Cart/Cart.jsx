import React, { useEffect } from "react";
import classes from "./Cart.module.css";
import Link from "next/link";
import Footer from "../footer/Footer";
import Button from "../Button/Button";
import Navbar from "../header/Navbar";
import CartTable from "./CartTable";
import { useDispatch, useSelector } from "react-redux";
import { cartTotal } from "@/store/slices/CartSlice";
import { checkout } from "./checkout";
import { useRouter } from "next/router";


const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(cartTotal());
  }, [cart]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <>
    
      <div className={classes.head}>
        <div
          className={classes.container}
          style={{ background: "hsl(0, 0%, 90%)" }}
        >
          <Navbar />
        </div>

        <div className={classes.row}>
          <CartTable />

          <div className={classes.column}>
            <span className={classes.fl}>
              <h3 className={classes.subtotal}>Cart Total</h3>

              <span className={classes.price}>{`$${totalPrice}`}</span>
            </span>
            <hr />
            <ul>
              <li>Safe dilevery</li>
              <li>will be dilevered in 3-4 working days</li>
              <li>
                shipping Fee <strong>5$</strong>
              </li>
            </ul>
            <hr />
            <span className={classes.rn}>
              <h3 className={classes.subtotal}>Total</h3>
              <span className={`${classes.price} ${classes.p2}`}>{`$${
                totalPrice + 5
              }`}</span>
            </span>
            <div className={classes.cn}>
              {isAuthenticated ? (
                <button
                  className={classes.btn}
                  onClick={() => {
                    checkout({
                      lineItems: [
                        {
                          price: "price_1OvZ2uSCq7Q0sCcX0LswlYuZ",
                          quantity: 1,
                        },
                      ],
                    });
                  }}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button onClick={goToLogin} className={classes.btn}>
                  Login to Buy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
