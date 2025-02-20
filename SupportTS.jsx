import React from "react";
import './ToyStoreStyling.css';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatIcon from '@mui/icons-material/Chat';


const SupportTS = () => {

    return(
        <>
            <br />
            <br />
            <div className="sup_mainCont">
                <div>
                    <div>
                        <h3>Queries and Support</h3>
                    </div>
                </div>

                <div className="sup_detailsCont">
                    <h4>Frequently Asked  Queries</h4>
                    <div  className="sup_detailsBtn" >
                        <details >
                            <summary>What payment methods do you accept?</summary>
                            <p>We accepts multiple payment methods including credit/debit cards, net banking, and UPI. Digital wallets like Paytm, PhonePe, and MobiKwik are also supported. For added convenience, Cash on Delivery (COD) is available for eligible orders.</p>
                        </details>

                        <details>
                            <summary>Can I remove items from my cart</summary>
                            <p>Yes, you can remove items from your cart by clicking on the "Remove" button next to the item in your cart.
                            </p>
                        </details>
                        <details>
                            <summary>How do I apply a discount or promo code</summary>
                            <p>To apply a discount or promo code, enter the code in the designated field at checkout and click "Apply."
                            </p>
                        </details>

                        <details>
                            <summary>What is the status of my order</summary>
                            <p>You can check the status of your order by logging into your account and navigating to the "Order Status" section.
                            </p>
                        </details>

                        <details>
                            <summary>Can I modify my order after placing it</summary>
                            <p> Depending on the status of your order, you may be able to modify it.
                                 Contact customer support for assistance if needed.</p>
                        </details>

                        <details>
                            <summary>How do I track my shipment</summary>
                            <p>You can track your shipment by using the tracking number provided in your order confirmation email. Enter the tracking number on the shipping carrier's website for updates.
                            </p>
                        </details>

                        <details>
                            <summary>Can I save items in my cart for later</summary>
                            <p>Need to Add that Option, Yes, you can save items in your cart for later by clicking on the "Save for Later" button.
                            </p>
                        </details>
                    </div>
                </div>
                <br />
                <div className="feedBack_Cont">

                    <div style={{textAlign:"left"}}>
                    <h4 for="feedback" >Provide Feedback</h4>
                    
                    <textarea rows={10} cols={80}></textarea>
                    <br />
                    <button style={{backgroundColor:"rgb(205 248 26)",height:"4vh",width:"10vh",border:"none",borderRadius:"1rem"}}>Submit</button>
                    </div>
                </div>
                <div className="contactSupportIcon">
                    <SupportAgentIcon sx={{ fontSize: 70 }} className="hoverVisibiltyIcons" />
                    <ChatIcon sx={{ fontSize: 70 }} className="hoverVisibiltyIcons" />
                    <ContactSupportIcon sx={{ fontSize: 70 }} className="onHoverDisplayIcons"/>
                </div>
            </div>
            <br />
            <br />
            <br />
        </>
    )

}

export default SupportTS;

