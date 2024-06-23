import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import remove from "../../images/remove.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import {
  setIncrease,
  setDecrease,
  clearCart,
  removeItem,
} from "@/store/slices/CartSlice";
import Link from "next/link";

const CartTable = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(
    (state) => state.cart
  );
  //this is cart from store.js
  // console.log(cart);
  const handleDecrease = (item) => {
    if(item.quantity>1){
      dispatch(setDecrease(item._id));
    } else {
      dispatch(removeItem(item._id));
    }
  }

  return (
    <>
      <div className="">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Details</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    marginLeft: "190px",
                  }}
                >
                  No items in the Cart
                </p>
              )}
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className={classes.pd}>
                      <Image src={item.image} width={70} height={70} alt="Image not found" />
                      <p style={{ marginLeft: "1.2em" }}>{item.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.but}>
                      <span onClick={() => handleDecrease(item)}>
                        -
                      </span>
                      <span className={classes.num}>{item.quantity}</span>
                      <span onClick={() => dispatch(setIncrease(item._id))}>
                        +
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{`$${item.price * item.quantity}`}</TableCell>
                  <TableCell>
                    <Image
                      onClick={() => dispatch(removeItem(item.id))}
                      src={remove}
                      alt=""
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link href="/shop">
            <button className={classes.btn}>Continue Shopping</button>
          </Link>
          {cart.length !== 0 && (
            <button
              style={{ marginLeft: "40px" }}
              onClick={() => dispatch(clearCart())}
              className={classes.btn}
            >
              Clear Cart
            </button>
          )}
        </TableContainer>
      </div>
    </>
  );
};

export default CartTable;
