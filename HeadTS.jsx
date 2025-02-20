import React, { children, useContext, useEffect, useRef, useState } from "react";
import './ToyStoreStyling.css';
import { useNavigate } from "react-router-dom";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FilterProduct from "./FilterProducts";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { Context } from "./ParentToyStore";
import CartedItems from "./CartedItems";
import { Search } from "@mui/icons-material";
import StoreIcon from '@mui/icons-material/Store';
import UserTS from "./UserTS";



const HeadTS = ({children}) => {

    const[showUser,setShowUser] = useState(false);
    const navigate = useNavigate();
    const{cart,setCart,orgData,setOrgData,setCopyData,setIconColor,iconColor,copyData,setLoginUser,loginUser} = useContext(Context);

    useEffect(() => {
        setIconColor("home");       
        navigate('/header/home');
    },[])


    const handleHome = () => {
        setIconColor("home");
        navigate('/header/home');
    }

    const handleShop = () => {
        setIconColor("shop");
        navigate('/header/shop');
    }

    const handleLogout = () =>{
        setIconColor("logout");
        setCart([]);
        let a = orgData?.map( e => {
            e.status = false;
            e.quantity =1;
            return e;
        });
        setCopyData(a);
        setOrgData(a);
        setIconColor("home");
        navigate('/loginPage');
        
    }

    const handleSupport = () => {
        setIconColor("support");
        navigate('/header/support')
    }

    const handleSearch = (e) => {
       if(e.target.value){
            let a = copyData?.filter( obj => obj.name.toUpperCase().includes(e.target.value.toUpperCase()))
            setOrgData(a);
       }
       else{
        setOrgData(copyData);
       }
    }

    const handleUser = () => {
        setShowUser(true);

    }



    return(
        <>
                <div className="headerCont">

                    <div className="logoCont">
                        <h1 style={{fontVariant: "small-caps slashed-zero",color:"white"}}>Toy Store</h1>
                    </div>

                    <div className="optionCont">
                        { (iconColor==="shop") ?
                        <div style={{display:'flex',border:'1px solid ',backgroundColor:'white'}}>
                            <div>
                            🔍 
                            </div>
                            <input   type = "text" style={{borderColor:'none'}}  className="searchInput" placeholder="Search..." onChange={handleSearch} />
                        </div> : null
                        }
                        
                        <HomeIcon onClick={handleHome} sx={{ color: (iconColor==="home") ? "white" : "black" }}/>
                        <StoreIcon onClick={handleShop} sx={{ color: (iconColor==="shop") ? "white" : "black" }}/>
                        <FilterProduct />
                        <Badge badgeContent={cart?.length} color="success">
                            <CartedItems  />
                        </Badge>
                        <ContactSupportIcon onClick={handleSupport} sx={{ color: (iconColor==="support") ? "white" : "black" }}/>
                        {/* <LogoutIcon onClick={handleLogout} sx={{ color: (iconColor==="logout") ? "white" : "black" }}/> */}
                   
                        <AccountCircleIcon onClick={handleUser} />
                        {
                            showUser ? 
                            <UserTS setShowUser={setShowUser} showUser={showUser} handleLogout={handleLogout}/> : null
                        }
                        
                    </div>

                </div>
                <br />
                <br />
                {children}
        </>
    );

}

export default HeadTS;


// <div style={{display:"flex",alignItems:"center"}}>
// <ShoppingCartIcon />
// <p style={{float:"left",border:"2px solid green",borderRadius:"50%"}}>12</p>

// </div>