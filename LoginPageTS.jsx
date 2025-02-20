import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ParentToyStore";



const LoginPageTS = () => {

        const[credentials,setCredentials] = useState({})
    

        const{loginData,setLoginData,loginUser,dispatch} = useContext(Context);

        const navigate = useNavigate();

        const handleCredentials = (e) => {
            setCredentials({...credentials,[e.target.name]:e.target.value});
        } 
        
        const handleLogin = () => {
            if(!credentials.username|| !credentials.password ){
                alert("Empty fields");
                return;
            }

            let validUser =  loginData?.find((e => e.name === credentials.username && e.passkey===credentials.password))
            
            if(validUser){
                navigate('/header/home');
                // setLoginUser(validUser);
                dispatch({type:"LOGIN",payload:validUser});
            }
            else{
                alert("Wrong Credentials")
            }
        }
        
        console.log("loginUser:",loginUser);

    return(
        <>
            <div className="login_bgCont">
                <div className="loginCont">
                    <label for="username">User:</label> <br/>  
                    <input type="text" name = "username" onChange={handleCredentials}/>  <br/>  
                    <br />
                    <label for="password">Password:</label> <br/>   
                    <input type="text" name = "password" onChange={handleCredentials} />  <br/> 

                    <br />
                    <button onClick={handleLogin} >Login</button>
                </div> 
            </div>
        </>
    )

}

export default LoginPageTS;