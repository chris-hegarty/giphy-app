import React, { useContext, useState, useMemo } from "react";
// No longer need useNavigate, but will need NavLink:
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function RegisterPage(){
    //*Bring in register function from user context:
    const {register} = useContext(UserContext)
    //local pieces of state
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");    
    // const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState("");
    //global pieces of state from context file
    const [show, setShow] = useState(false);
    const {loggedInUser, login, logout} = useContext(UserContext)
    //*Add error handling:
    //* You will wrap these in useMemo to store the results.
    //* 1) Check if password requirements met:
    const passError = useMemo(
        () => password.length < 8 || password.length > 30,
        [password] 
    )
    //* 2) Check if username requirements are met
    const userError = useMemo(
        ()=> username.length < 4 || username.length > 20,
        [username]
    )
    //* 3) Check if password confirmation passed:
    const confirmError = useMemo(
        () => confirmPassword !== password || passError,
        [confirmPassword, password, passError]
    )   
    return(
        <>
        <form>
        
        <div>
        <label htmlFor="user-name">Username</label>
        <input             
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="user-name"
            type="text" 
        />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input             
            value={password}
            onChange={ (e) => {
              setPassword(e.target.value);
            } }
            id="password"
            type={show === true ? "text" : "password"}     
        />
        <span>
            <label htmlFor="check-box">Show Password</label>
            <input 
            value={show}
            onChange={ (e)=>{ setShow(e.target.checked)} }
            type="checkbox" 
            name="register-checkbox" 
            id="check-box" 
            />
        </span>
        </div>

        <div>
        <label htmlFor="confirm">Confirm Password</label>
        <input             
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);   
            }}
            id="confirm"
            type={show ? "text" : "password"}
        />
        </div>
        <div>
        <button 
            onClick={ (e) => { 
            e.preventDefault()
            if(password === confirm){ 
                    navigate("/search") 
                }
            } }>Submit
        </button>
        </div>
        
        </form>
        </>
        
    )
}

export default RegisterPage