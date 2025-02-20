import { Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import { Context } from "./ParentToyStore";

const FilterProduct = () => {

    const[anchorEl,setAnchorEl] = useState(null);
    const{copyData,setCopyData,orgData,setOrgData} = useContext(Context);

    const handlePop = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const hanldeFilter = (str) => {
        if(str){
            let a = copyData?.filter( e => {
                if(e.type===str){
                    return e;
                }
            })
            setOrgData(a);
        }
        else{
            setOrgData(copyData);
        }
        setAnchorEl(null);
    }

    return(
        <>
                <CategoryIcon onClick={handlePop}  className="more"/>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} 
                    onClose={() => setAnchorEl(null)}

                    PaperProps={{
                        sx: {
                            backgroundColor: "rgb(17,23,74)",
                            color:"white",
                        },
                    }}
                    onChange={(e) => e.target.value}
                >
                    <MenuItem  onClick={() => hanldeFilter("Anime")}>Anime</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("Cartoon")}>Cartoon</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("Comics")}>Comics</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("")}>All</MenuItem>                            
                </Menu>
        </>
    )

}

export default FilterProduct;




                    {/* <MenuItem  onClick={() => hanldeFilter("OnePiece")}>One Piece</MenuItem>
                    <MenuItem  onClick={() => hanldeFilter("Naruto")}>Naruto</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("DragonBall")}>DragonBall</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("DCU")}>DCU</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("Tom_Jerry")}>Tom & Jerry</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("JackieChan")}>JackieChan</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("Heman")}>He-Man</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("Doraemon")}>Doraemon</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("ShinChan")}>Shin Chan</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("Ben10")}>Ben 10</MenuItem>                            
                    <MenuItem  onClick={() => hanldeFilter("ChotaBheem")}>Chota Bheen</MenuItem>                             */}