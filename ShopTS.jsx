
import React, {useContext, useEffect, useState } from "react";
import { Context } from './ParentToyStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from "react-router-dom";

const ShopTS = () => {
    
    // const [favorites, setFavorites] = useState({});
    
    const navigate = useNavigate();
    const{orgData,setOrgData,copyData,setCopyData,cart,setCart,setAdd,handleDecrement,handleIncrement,handleRemoveCart} = useContext(Context);

    // const toggleFavorite = (itemId) => {
    //     setFavorites((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
    // };

    const handleAddCart = (obj) => {
            obj.status = true;
            
            setCart([...cart,obj]);
    }
    // console.log("org: ",orgData);
    // console.log("copy: ",copyData);
    // console.log("cart:",cart);

    const handleNavigateToBuy = () => {
        console.log("navigate:",navigate);
        navigate('/header/buy');
    }


    return(
       <>
            <div className="shopBgCont">
                    {
                        orgData.map(e => <div className="item_Cont">
                                <div className='img_Cont'>
                                    <img src={e.imgUrl} height={"200vh"} width={"150vw"} />
                                    {/* <span className="favIcon" onClick={() => toggleFavorite(e.id)}>
                                        {favorites[e.id] ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
                                    </span> */}
                                </div>

                                <div className='itemDetails_Cont'>
                                    <h2>{e.name}</h2>
                                    <h3 >{e.price}</h3>   
                                </div>
                                {
                                    e.status ? <div style={{display:"flex",justifyContent:"space-evenly"}}>
                                     <div style={{display:"flex",flexDirection:"row"}}>   
                                        <RemoveIcon onClick={() => handleDecrement(e)} className="removeIcon"/>
                                        <span style={{color:"rgb(226 0 172)"}}>{e.quantity}</span>
                                        <AddIcon onClick={() => handleIncrement(e)} className="addIcon"/>
                                    </div>
                                    <div className="deleteIcon" title="remove from cart">    
                                        <Delete onClick={() => handleRemoveCart(e)} sx={{color:"rgb(228 0 0)"}} />
                                    </div>    
                                </div>
                                    :<button onClick={() => handleAddCart(e)} className="addToCartBtn">Add to Cart</button>
                                }
                            </div>)
                    }
                    <div className="buyIconInShop">
                    <LocalMallIcon sx={{
                        fontSize:"40px",
                        color:"white"
                    }}  onClick={handleNavigateToBuy} />
                   </div> 
            </div>

            
       </>
    )

}

export default ShopTS;



// let a = orgData?.map(e => {
//     if(e.id==obj.id){
//         e.status= true;
//         return e;
//     }
//     else {
//         return e;
//     }

// });
// setOrgData(a);
// setCopyData(a);

// let b =  orgData?.filter(e => e.status);
// setCart(b);


// const handleAddCart = (obj) => {
//     obj.status = true;
    
//     // let a = cart.find(e => e.id==obj.id);
//     // setAdd(a);

//     // let found = cart?.found(e => e.id==obj.id);

//     setCart([...cart,obj]);

// // let b = orgData?.filter((e) =>{ 
// // if(e.status){
// //     e = {...e,totalPrice:e.quantity*e.price};
// //     return e;

// // } 
// // setCart(b); 
// // })
// }



