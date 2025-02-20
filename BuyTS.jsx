import React, { useContext, useEffect, useState } from "react";
import { Context } from "./ParentToyStore";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Swal from "sweetalert2";

const BuyTs = () => {

    const[paymentType,setPaymentType] = useState(null);
    const[paymentDone,setPaymentDone] = useState(false);
    const[confirmDialog,setConfirmDialog] = useState(null);
    const[cardValidate,setCardValidate] = useState(false);
    const[saveNewAddress,setSaveNewAddress] = useState({name:"",contact:"",email:"",village:""});
    const{cart,setCart,totalBill,setOrgData,setCopyData,orgData,loginUser,dispatch} = useContext(Context);

    console.log("loginUser:",loginUser);
    const handlePaymentChange = (e) => {
        setPaymentType(e.target.value);
    }

    const handleOnlinePayment = () => {
        let text = "payment completed or not";
        if(window.confirm(text) === true)
        {
            setCardValidate(true);
            setPaymentDone(true);
        }
        else{
            setPaymentDone(false);
        }
    }

    const handleBuyNow = () => {
        if(!saveNewAddress.name || !saveNewAddress.contact || !saveNewAddress.village)
        {
            alert("* fields are mandatory");
        }
        else{
            setConfirmDialog(true);
        }
    }

    const handleChange = () => {
        setConfirmDialog(false);
    }

    const handleConfirm = () => {
        setCart([]);
        setSaveNewAddress({name:"",contact:"",email:"",village:""});
        setConfirmDialog(false);
        setPaymentType(null);setCart([]);
        let a = orgData?.map( e => {
            e.status = false;
            e.quantity =1;
            return e;
        });
        setCopyData(a);
        setOrgData(a);
        
        Swal.fire({
            title: 'Success!',
            text: 'Order Successs!',
            text:`Order Reference id:${Date.now().toString()}`,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
    }

    const hanldleSaveNewAddress = (e) => {
        setSaveNewAddress({...saveNewAddress,[e.target.name]:e.target.value});
    }

    // const handleAddAddress = () => {
    //     let newId = (loginUser?.address.length>0) ?(loginUser.address[loginUser.address.length-1].id+1)  :1 ;
    //     setLoginUser({...loginUser,address:[...loginUser.address,{...saveNewAddress,id:newId}]});
    // }

    const handleAddAddress = () => {
        dispatch({
            type: "ADD_ADDRESS",
            payload: saveNewAddress
        });
    };


    // console.log("loginUser in Buy:",loginUser)

    return(
        < >

            <br />
            <br />

            <div class="buyer_Details">
                <div class="form-group">
                    <label for="name">Name:<span style={{color:"red"}}>*</span></label>
                    <input type="text" id="name" value={saveNewAddress.name} name="name" onChange={hanldleSaveNewAddress}/>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:<span style={{color:"red"}}>*</span></label>
                    <input type="text" id="phone" value={saveNewAddress.contact} name="contact" onChange={hanldleSaveNewAddress} />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" value={saveNewAddress.email} name="email" onChange={hanldleSaveNewAddress} />
                </div>
                <div class="form-group">
                    <label for="address">Address:<span style={{color:"red"}}>*</span></label>
                    <textarea id="address" name = "village" value={saveNewAddress.village} onChange={hanldleSaveNewAddress}  ></textarea>
                </div>
                <div style={{display:"flex",justifyContent:"end"}}>
                    {/* <select>
                        <option>Saved Adress</option>
                        <option>Address1</option>
                        <option>Address2</option>
                    </select> */}

                    <button style={{
                        border:"none",
                        backgroundColor:"white",
                        height:"3vh",
                        borderRadius:"1rem",
                        fontWeight:"bold",
                    }} onClick={handleAddAddress}>Save Address</button>
                </div>
            </div>

          

            <div className="buy_BillCont">
                <h3>
                    Order Summary
                </h3>
                
                <div className="bill_Cont">
                    { cart?.map((e) => 
                        <div className="boughtItem_Details">
                            <p>{e.name} <span style={{color:"gray"}}>x</span> {e.quantity} </p>
                            <h3>{e.totalPrice}</h3>
                        </div>

                    )} 

                </div>
                <div  className="paySelect_Cont">  
                    <p style={{color:"rgb(255 0 0)",fontWeight:"bold"}}>*Select Payment*</p>
                    <input type="radio" id="cod" name="payment" value="cod" onChange={handlePaymentChange} checked={paymentType === "cod"} disabled={cardValidate && paymentType ==="card"} />
                    <label htmlFor="cod">COD</label>

                    <input type="radio" id="upi" name="payment" value="upi" onChange={handlePaymentChange} checked={paymentType === "upi"} disabled={cardValidate && paymentType ==="card"} />
                    <label htmlFor="upi">UPI</label>

                    <input type="radio" id="card" name="payment" value="card" onChange={handlePaymentChange} checked={paymentType === "card"}/>
                    <label htmlFor="card">Card</label>
                </div>

                <div>
                    {
                        (paymentType==="cod")?
                        <h2>Total Price: {totalBill+ 25}</h2>
                        :<h2>Total Price: {totalBill}</h2>
                    }
                    
                </div>

                <div>
                    {
                        (paymentType==="cod") ? 
                        <div>
                           <h5 style={{color:"red"}}>Additional amount of 25 will be charged due to convinence charges</h5>
                        </div> 
                        : (paymentType==="upi") ? 
                        <div className="upi_Cont">
                             < br />
                            <label for="upiPay">UPI:</label>
                            <input type="text" placeholder=" enter your example@upi" />
                        </div> 
                        :(paymentType === "card") ? 
                        <div>
                        < br />
                            <div className="card_Details">
                                <h5 style={{color:"rgb(63 154 27)"}}>Enter your card details below.</h5>
                                <input type="number" placeholder="Card Number" />
                                <br />
                                <input type="text" placeholder="Expiry Date  MM/YYYY" />
                                <br />
                                <input type="number" placeholder="CVV" />
                                <br />
                                {
                                    (!cardValidate)?
                                <button onClick={handleOnlinePayment} >Validate</button> : null
                                }
                            </div>
                        </div> : null
                    }

                </div>

                <br />
                    {
                        (paymentType==="cod" || paymentType==="upi") ?<button onClick={handleBuyNow}>Buy Now</button>  
                        :(cardValidate && paymentType==="card") ? <button onClick={handleBuyNow}>Buy Now</button> : (!cardValidate && paymentType==="card") ?<button style={{backgroundColor:"gray"}}>please validate card</button> : null
                        
                    }

            </div>
            <br />
            <br />

            <Dialog
            open={confirmDialog}
            sx={{
                "& .MuiPaper-root": {
                    background: "rgb(101, 223, 237)", // Gradient background
                    borderRadius: "15px", // Rounded corners
                    padding: "20px",
                    color: "rgb(144 0 0)", // Text color
                    width: "400px"
                }
            }}
            >
                <DialogTitle 
                 sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                }} >
                        Order Confirmed
                </DialogTitle>
  
                <DialogContent sx={{ textAlign: "center" }}>
                    {cart?.map((e, index) => (
                        <p key={index} style={{ margin: "5px 0", fontWeight: "500" }}>
                         {e.name}
                        </p>
                    ))}
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <button onClick={handleChange} style={{
                        backgroundColor: "#ff6b6b",
                        color: "#fff",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6b6b")}>change</button>
                    <button onClick={handleConfirm}  style={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "0.3s",   //hover color changing
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#388E3C")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}>confirm</button>
                </DialogActions>
            </Dialog>
  
        </>
    )

}

export default BuyTs;


// onClick={handleAddAddress}


// const random = Math.random(); // id = 0.1930028261207366
// const s = random.toString    (16);  // s  = '0.3168a21a39612'
// const id = s.slice(2);          // id = '3168a21a39612'

// // In one line
// const id = Math.random().toString(16).slice(2);