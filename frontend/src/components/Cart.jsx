import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import cart from "../images/cart.png";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.scss";
import { Close } from "@mui/icons-material";
import "../styles/cart.css";
import watch3 from "../images/watch3.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
const CartComponent = () => {
  const [state, setState] = React.useState({ right: false });
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [price, setPrice] = React.useState();
  const [num, setNum] = React.useState(0);
  const [quantity, setQuantity] = React.useState(null);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const toggleModel = () => {
    setOpen(!open);
  };

  const getCart = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/api/v1/user/getCart/${user.id}`
      );
      setItem(data?.cart?.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      item?.map(
        (order) =>
          (total =
            total +
            (order.price - order.price * (order.discount / 100)) *
              parseInt(order.quantity))
      );
      setPrice(total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (uid, quantity) => {
    setNum((prevNum) => {
      const newNum = prevNum + 1;
      const updatedQuantity = parseInt(quantity) + newNum;
      handleChange(uid, updatedQuantity);
      return newNum;
    });
    setNum(0);
  };

  const handleDecrement = (uid, quantity) => {
    setNum((prevNum) => {
      const newNum = prevNum - 1; // Prevent negative quantities
      const updatedQuantity = parseInt(quantity) + newNum;
      handleChange(uid, updatedQuantity);
      return newNum;
    });
    setNum(0);
  };

  const handleChange = async (uid, qty) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5001/api/v1/user/updateCart/${user?.id}`,
        { uid, qty }
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async(uid)=>{
    try {
      const {data} = await axios.post(`http://localhost:5001/api/v1/user/deleteCart/${user?.id}`,{uid})
      getCart()
    } catch (error) {
      console.log(error)
    }
  }

  



  React.useEffect(() => {
    totalPrice();
  }, [item]);

  React.useEffect(() => {
    getCart();
  }, [user?.id]);
  
  const list = (anchor, items) => (
    <div className="Cart-Area">
      <div className="top">
        <div className="title">Your Cart</div>
        <Button className="button" onClick={toggleDrawer(anchor, false)}>
          <CloseIcon />{" "}
        </Button>
      </div>
      {item?.length > 0 ? (
        <>
          {item?.map((c) => (
            <div key={c.uid} className="bg-white rounded-lg shadow-md mb-4 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={c.image}
                      alt="item-image"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <h2 className="text-lg font-semibold text-gray-800">{c.name}</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleDelete(c?.uid)}
                    className="text-gray-500 hover:text-[#d44479]"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrement(c.uid, c.quantity)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-[#d44479] text-[#d44479] hover:bg-[#d44479] hover:text-white transition-colors"
                    >
                      &#8722;
                    </button>
                    <span className="text-lg font-medium w-10 text-center">
                      {parseInt(c.quantity) + num}
                    </span>
                    <button
                      onClick={() => handleIncrement(c.uid, c.quantity)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-[#d44479] text-[#d44479] hover:bg-[#d44479] hover:text-white transition-colors"
                    >
                      &#43;
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-[#d44479] font-semibold text-lg">
                      ₹{c.price - c.price * (c.discount / 100)}
                    </p>
                    <p className="text-sm text-gray-500">
                      M.R.P.: <span className="line-through">₹{c.price}</span>
                      <span className="ml-2 text-green-600">({c.discount}% Off)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Subtotal</h2>
              <span className="text-xl font-bold text-[#d44479]">₹ {price}</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Inclusive of all taxes. Discount codes will be applied at checkout page
              </p>
              
              <Link
                to="/OrderDetails"
                className="block w-full"
              >
                <button className="w-full bg-[#d44479] text-white py-3 px-6 rounded-lg font-semibold
                  transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                  active:scale-[0.98] active:shadow-md">
                  Place Order ₹{price}
                </button>
              </Link>
            </div>
          </div>
        </>
      ): (
        <>
          <Box
            sx={{
              width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            className="Cart_Element"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <Divider style={{ color: "black" }} />
            <div className="text_In_Cart">
              <p className="EmptyCart no-spacing mini-cart__empty-text h3">
                Your cart is currently empty
              </p>
              <p className="mini-cart__empty-text">
                Not sure where to start? Try these collections:
              </p>
            </div>
          </Box>

          <div className="buttonsCart">
            <Link
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/smartwatch"}
            >
              <button
                className='button_cart2
                  relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
                    px-4 py-2 font-semibold
                  uppercase transition-all duration-500
                  
                  before:absolute before:inset-0
                  before:-z-10 before:translate-x-[150%]
                  before:translate-y-[150%] before:scale-[2.5]
                  before:rounded-[100%] before:bg-[#d44479]
                  before:transition-transform before:duration-1000
                  before:content-[""]

                  hover:scale-105 hover:text-PrimaryColor
                  hover:before:translate-x-[0%]
                  hover:before:translate-y-[0%]
                  active:scale-95'
              >
                <span>Smart Watches</span>
              </button>
            </Link>
            <Link
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/newlaunches"}
            >
              <button
                className='button_cart2
       relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        px-4 py-2 font-semibold
       uppercase transition-all duration-500
       
       before:absolute before:inset-0
       before:-z-10 before:translate-x-[150%]
       before:translate-y-[150%] before:scale-[2.5]
       before:rounded-[100%] before:bg-[#d44479]
       before:transition-transform before:duration-1000
       before:content-[""]

       hover:scale-105 hover:text-PrimaryColor
       hover:before:translate-x-[0%]
       hover:before:translate-y-[0%]
       active:scale-95'
              >
                <span>New Launches</span>
              </button>
            </Link>
            <Link
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/earphones"}
            >
              <button
                className='button_cart2
       relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        px-4 py-2 font-semibold
       uppercase transition-all duration-500
       
       before:absolute before:inset-0
       before:-z-10 before:translate-x-[150%]
       before:translate-y-[150%] before:scale-[2.5]
       before:rounded-[100%] before:bg-[#d44479]
       before:transition-transform before:duration-1000
       before:content-[""]

       hover:scale-105 hover:text-PrimaryColor
       hover:before:translate-x-[0%]
       hover:before:translate-y-[0%]
       active:scale-95'
              >
                <span>Earphones</span>
              </button>
            </Link>
            <Link
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/speakers"}
            >
              <button
                className='button_cart2
       relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        px-4 py-2 font-semibold
       uppercase transition-all duration-500
       
       before:absolute before:inset-0
       before:-z-10 before:translate-x-[150%]
       before:translate-y-[150%] before:scale-[2.5]
       before:rounded-[100%] before:bg-[#d44479]
       before:transition-transform before:duration-1000
       before:content-[""]

       hover:scale-105 hover:text-PrimaryColor
       hover:before:translate-x-[0%]
       hover:before:translate-y-[0%]
       active:scale-95'
              >
                <span>Speakers</span>
              </button>
            </Link>
            <Link
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/accessories"}
            >
              <button
                className='button_cart2
       relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        px-4 py-2 font-semibold
       uppercase transition-all duration-500
       
       before:absolute before:inset-0
       before:-z-10 before:translate-x-[150%]
       before:translate-y-[150%] before:scale-[2.5]
       before:rounded-[100%] before:bg-[#d44479]
       before:transition-transform before:duration-1000
       before:content-[""]

       hover:scale-105 hover:text-PrimaryColor
       hover:before:translate-x-[0%]
       hover:before:translate-y-[0%]
       active:scale-95'
              >
                <span>Accessories</span>
              </button>
            </Link>
            <Link
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/bulkorder"}
            >
              <button
                className='button_cart2
       relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        px-4 py-2 font-semibold
       uppercase transition-all duration-500
       
       before:absolute before:inset-0
       before:-z-10 before:translate-x-[150%]
       before:translate-y-[150%] before:scale-[2.5]
       before:rounded-[100%] before:bg-[#d44479]
       before:transition-transform before:duration-1000
       before:content-[""]

       hover:scale-105 hover:text-PrimaryColor
       hover:before:translate-x-[0%]
       hover:before:translate-y-[0%]
       active:scale-95'
              >
                <span>Bulk Order</span>
              </button>
            </Link>
            <button
              className='button_cart2
       relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        px-4 py-2 font-semibold
       uppercase transition-all duration-500
       
       before:absolute before:inset-0
       before:-z-10 before:translate-x-[150%]
       before:translate-y-[150%] before:scale-[2.5]
       before:rounded-[100%] before:bg-[#d44479]
       before:transition-transform before:duration-1000
       before:content-[""]

       hover:scale-105 hover:text-PrimaryColor
       hover:before:translate-x-[0%]
       hover:before:translate-y-[0%]
       active:scale-95'
            >
              <span>Blogs</span>
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ minWidth: "38px" }}
            className="button1 color-[black]"
            onClick={toggleDrawer(anchor, true)}
          >
            <ShoppingCart/>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor, true)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartComponent;
