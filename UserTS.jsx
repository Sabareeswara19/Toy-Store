import React, { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import "./ToyStoreStyling.css";
import { Context } from "./ParentToyStore";


const UserTS = ({setShowUser,showUser,handleLogout}) => {

    const {loginUser,setLoginUser} = useContext(Context);
  
    return(
        <>

            <div className="sidebar">
                <div style={{width:"50%",height:"20%",margin:".5rem auto",position:"relative"}}>
                    
                    <img src={loginUser?.userImg} style={{position:"absolute",height:"100%",width:"100%",top:"0",left:"0",borderRadius:"50%"}} alt="user-image"/>
                </div>
                <h4>{loginUser.name}</h4>
               
                <CloseIcon onClick={() => setShowUser(false)} className="userCont_Close"  sx={{fontSize:"40px"}} />

                <br />
                <div style={{textAlign:"left",cursor:"pointer"}}>
                    {/* <div className="userCont_Options">
                        <LocalShippingIcon /> 
                        Address
                    </div> */}
                    <br /> 
                    <div onClick={handleLogout} className="userCont_Options">
                        <LogoutIcon />
                        <p>Logout</p>
                    </div>
                </div>
            </div> 

        </>
    )
}

export default UserTS;

// 
// 