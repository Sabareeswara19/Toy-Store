import React, { useContext, useEffect } from "react";
import { Context } from "./ParentToyStore";
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from "react-router-dom";


const HomeTS = () => {
    const navigate = useNavigate();
    const{setIconColor} = useContext(Context);
 
    // const handleGotoStore = () => {
    //     alert("Shop Clicked");
    //     setIconColor("shop");
    //     navigate('/header/shop');
    // }
    
    return(

            <div className="home_Cont">
                <br />
                <br />
                <br />
                <br />
                <h1 style={{fontVariant: "small-caps slashed-zero",color:"white"}}>"Where Heroes Come to Life!"</h1>

                <h4 style={{fonVariant: "common-ligatures tabular-nums",color:"white"}}>Hope that resonates with the epic nature of your action figure store! 🦸‍♂️💥</h4>
            
                {/* <StoreIcon  onClick ={handleGotoStore} className="storeIconInHome" sx={{ fontSize: 80,color:"white" }} /> */}

            </div>

    )

}

export default HomeTS;

