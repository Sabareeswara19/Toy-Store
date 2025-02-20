import React, { useContext, useEffect, useMemo, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Context } from "./ParentToyStore";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

const CartedItems = () => {

    const[dialog,setDialog] = useState(false)
    const{cart,setCart,orgData,setTotalBill,handleIncrement,handleDecrement,handleRemoveCart,setIconColor,iconColor} = useContext(Context);
    const navigate = useNavigate();

     const grandTotal = useMemo(() => {
        let total = cart?.reduce((tot,e) => (tot+e.totalPrice),0);
        return total;
    })

    useEffect(() => {
        setTotalBill(grandTotal);
    },[grandTotal]);

    const hanldeBuy = () => {
        navigate('/header/buy');
        setDialog(false);
    }

    const hanldeDialog = () => {
        setIconColor("cart");
        setDialog(true);
    }

    const handleCLose = () => {
        setIconColor("shop");
        setDialog(false);
    }

    const handleGotoCart = () =>{
        navigate('/header/shop');
        setIconColor("shop");
        setDialog(false);
    }

    return(
        <>
            
            <ShoppingCartIcon  onClick={hanldeDialog} sx={{ color: (iconColor==="cart") ? "white" : "black" }}/>
            <Dialog
            open={dialog}
            >
                <DialogTitle  >
                        Carted Items
                </DialogTitle>
                {
                 (cart.length>0) ?   
                <div >   
                    <DialogContent >
                    {
                            
                            cart?.map(e => <div className="carted_Cont">
                                <div className="cartImg_Cont" >
                                    <img src={e.imgUrl} height={"135vh"} width={"120vw"}/>
                                    <div style={{display:"flex",justifyContent:"center"}}>
                                        <RemoveIcon onClick={() => handleDecrement(e)}/>
                                        <span style={{margin:"0"}}>{e.quantity}</span>
                                        <AddIcon onClick={() => handleIncrement(e)}/>
                                    </div>
                                    <button  className="inCart_removeBtn" onClick={() => handleRemoveCart(e)}>Remove Item</button>

                                </div>

                                <div className="cartData_Cont" style={{width:"30vw"}}>
                                    <h4 style={{margin:"0"}}>{e.name}</h4> 
                                    <p>{e.details}</p> 
                                    <div style={{display:"flex",justifyContent:"row",alignItems:"center"}}>
                                        <button style={{height:"4vh",backgroundColor:"lightgreen",border:"none",margin:"1rem"}}>Price</button>
                                        <p style={{marginLeft:"0.5rem"}}>Rs.{e.totalPrice = e.price* e.quantity}/-</p> 
                                    </div>
                                </div>
                            </div>)
                        }

                    </DialogContent>
                    <button  className="cartContinueBtn"  onClick={hanldeBuy}>click to continue</button>
                    </div> 
                    : 
                    <DialogContent style={{color:"red"}}>
                        No items added in the cart
                    </DialogContent>
                }

                {      
                     (cart.length>0) ?   
                    <DialogActions >
                        <button 
                        style={{
                            backgroundColor: "#ff6b6b",
                            color: "#fff",
                            border: "none",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                            transition: "0.3s",
                        }} onClick={handleCLose} title="close the dialog box">Close</button>
                    </DialogActions>
                :
                    <DialogActions>
                        <button onClick={handleGotoCart} title="go to cart" 
                        style={{
                            backgroundColor:"rgb(86 227 86)",
                            border:"none",
                            width:"10vw",
                            cursor:"pointer",
                            borderRadius: "8px",
                            height:"4vh",
                        }}
                        >go to Cart</button>
                    </DialogActions>
                }


            </Dialog>
        </>
    )

}


export default CartedItems;

