import classes from "./Shop.module.css";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setSortBy,
  categoryFilter,
  companyFilter,
  addToCart,
  priceFilter,
  clearFilter,
  searchFilter,
  setProducts,
} from "@/store/slices/CartSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from '../header/Navbar'
import axios from "axios";

const Shop = () => {
  const usedispatch = useDispatch();

  const { filter_products, minPrice, maxPrice, Price } = useSelector(
    (state) => state.cart
  );

  const [svalue, setSvalue] = useState("");

  const handleSearchChange = (e) => {
    setSvalue(e.target.value);
    usedispatch(searchFilter(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Products");
        usedispatch(setProducts(response.data.product));
      } catch (error) {
        console.error("Error fetching Products:", error);
      } 
    };
    
    fetchData();
  }, []);

  return (
    <>
    <Navbar />
      <div className={classes.head}>
        
        <input
          className={classes.compselect}
          type="text"
          value={svalue}
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <h2 style={{ fontSize:"2em"}}>Products</h2>
        
          <select
            onClick={(e) => usedispatch(setSortBy(e.target.value))}
            name="sort"
            id="sort"
            className={classes.sortselect}
          >
            <option value="lowest">Price(low to high)</option>
            <option value="highest">Price(high to low)</option>
            <option value="a-z">Price(a-z)</option>
            <option value="z-a">Price(z-a)</option>
          </select>
       
      </div>
      <div className={classes.shop}>
        <div className={classes.leftshop}>
          <h3>Category</h3>
          <ul>
            <li onClick={() => usedispatch(categoryFilter("ALL"))}>All</li>
            <li onClick={() => usedispatch(categoryFilter("PHONES"))}>
              Phones
            </li>
            <li onClick={() => usedispatch(categoryFilter("LAPTOPS"))}>
              Laptop
            </li>
            <li onClick={() => usedispatch(categoryFilter("PLAYSTATION"))}>
              PlayStation
            </li>
            <li onClick={() => usedispatch(categoryFilter("HEADPHONES"))}>
              Headphones
            </li>
            <li onClick={() => usedispatch(categoryFilter("SMARTWATCHES"))}>
              SmartWatch
            </li>
          </ul>
          <h3>Company</h3>
          <select
            onClick={(e) => usedispatch(companyFilter(e.target.value))}
            className={classes.compselect}
            name="company"
            id="company"
          >
            <option value="All">All</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Nikon">Nikon</option>
            <option value="FireBoult">FireBoult</option>
          </select>
          <h3>Price</h3>
          <div className={classes.fl}>
            <p>{`$${Price}`}</p>
            <input
              type="range"
              id="vol"
              name="price"
              onChange={(e) => usedispatch(priceFilter(e.target.value))}
              min={minPrice}
              max={maxPrice}
            />
            <button
              className={classes.btn}
              onClick={() => usedispatch(clearFilter())}
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div className={classes.smallcontainer}>
          <div className={classes.row}>
            {filter_products.map((data) => (
              <div className={classes.row}>
                <div className={classes.coln} key={data.id}>
                  <Image src={data.image} width={120} height={120} alt="" />
                  <Link
                    href="/cart"
                    onClick={() => usedispatch(addToCart(data))}
                  >
                    <button className={classes.cbtn}>Add To Cart</button>
                  </Link>
                  <h3>{data.name}</h3>
                  <h3>{`$${data.price}`}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Shop;
