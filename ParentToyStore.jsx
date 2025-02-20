import "./ToyStoreStyling.css";

import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomeTS from "./HomeTS";
import ShopTS from "./ShopTS";
import LoginPageTS from "./LoginPageTS";
import HeadTS from "./HeadTS";
import BuyTs from "./BuyTS";
import {toysData,userData} from "./Data";
import SupportTS from "./SupportTS";
import UserTS from "./UserTS";

export const Context = createContext();

const loginReducer = (state, action) => {
  //state reffers to the loginUser data
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("loginUser", JSON.stringify(action.payload));
      return action.payload;

    case "LOGOUT":
      localStorage.removeItem("loginUser");
      return { name: "", passkey: "", userImg: "", address: [] };

    case "ADD_ADDRESS":
      // console.log("state:",state);   
      const newId = state.address.length > 0 ? state.address[state.address.length - 1].id + 1 : 1;
      // console.log("action.payload:",action.payload);
      const updatedAddress = [...state.address, { ...action.payload, id: newId }];
      // console.log('updatedAddress:',updatedAddress);

      
      // Update localStorage to persist changes
      localStorage.setItem("loginUser", JSON.stringify({ ...state, address: updatedAddress }));

      return { ...state, address: updatedAddress };

    default:
      return state;
  }
};


const getInitialUserState = () => {
  const storedUser = localStorage.getItem("loginUser");
  return storedUser ? JSON.parse(storedUser) : { name: "", passkey: "", userImg: "", address: { name: "", contact: "", email: "", village: "" } };
};


const ParentToyStore = () => {
  const [loginUser, dispatch] = useReducer(loginReducer, getInitialUserState());
  const[loginData,setLoginData] = useState(userData);
  const [orgData, setOrgData] = useState(toysData);
  const [copyData, setCopyData] = useState(toysData);
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [add, setAdd] = useState({});
  // const[loginUser,setLoginUser] = useState();
  // const[loginUser,setLoginUser] = useState({name:"",passkey:"",userImg:"",address:{name:"",contact:"",email:"",village:""}});


  // useEffect(() => {
  //   setLoginUser(loginUser);
  // },[]);

  const [iconColor, setIconColor] = useState("home");


  const handleIncrement = (obj) => {
    setCart((a) => {
      console.log("a:", a);
      return a?.map((e) => {
        if (e.id === obj.id) {
          e.quantity = parseFloat(e.quantity) + 0.5;
          return e;
        } else return e;
      });
    });
    console.log("hello");
  };


  const handleDecrement = (obj) => {
    if (obj.quantity == 1) {
      alert("minimun quantity reached");
    } else {
      setCart((cart) =>
        cart?.map((e) => {
          if (e.id === obj.id) {
            e.quantity = parseFloat(e.quantity) - 0.5;
            return e;
          } else return e;
        })
      );
    }
  };

  const handleRemoveCart = (obj) => {
    let a = cart?.map((e) => {
      if (e.id == obj.id) {
        e.status = false;
        e.quantity = 1;
        return e;
      } else return e;
    });

    let b = a?.filter((e) => e.status);
    setCart(b);
  };

  return (
    <>
      <Context.Provider
        value={{
          loginData,setLoginData,
          // loginUser,setLoginUser,
          cart,setCart,
          orgData,setOrgData,
          copyData,setCopyData,
          totalBill,setTotalBill,
          add,setAdd,
          handleDecrement,
          handleIncrement,
          handleRemoveCart,
          iconColor,setIconColor,   
          loginUser,dispatch       
        }}
      >
        <HashRouter>
          <Routes>
            <Route index element={<Navigate to="/loginPage" />} />
            <Route path="/loginPage" element={<LoginPageTS  />} />
            <Route
              path="/header"
              element={
                <HeadTS>
                  <Outlet />
                </HeadTS>
              }
            >
              <Route index element={<Navigate to="/header/home" />} />
              <Route path="/header/home" element={<HomeTS />} />
              <Route path="/header/shop" element={<ShopTS />} />
              <Route path="/header/buy" element={<BuyTs />} />
              <Route path="/header/support" element={<SupportTS />} />
              {/* <Route path="/header/user" element={<UserTS />} /> */}
            </Route>
          </Routes>
        </HashRouter>
      </Context.Provider>
    </>
  );
};

export default ParentToyStore;

// <HashRouter>
//     <Routes>
//         <Route index element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/home" element={<Layout />}>
//             <Route index element={<Navigate to="/home/home" />} />
//             <Route path="/home/home" element={<Home />} />
//             <Route path="/home/shop" element={<Shop />} />
//             <Route path="/home/cart" element={<Cart/>} />
//             <Route path="/home/contact" element={<Contact />} />
//         </Route>
//         <Route path="/login" element={<LoginPage />} />
//     </Routes>
// </HashRouter>


   // setCart([{...cart[0],quantity : parseInt(cart[0].quantity)+1 }])
    // console.log("handleIncrement");
