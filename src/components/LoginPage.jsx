import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";// import {  } from "module";

function LoginPage() {

    //navigate functionality
    const navigate = useNavigate();
    //local pieces of state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [show, setShow] = useState(false);
    //global pieces of state from context file
    const [show, setShow] = useState(false);
    const { loggedInUser, login, logout } = useContext(UserContext)

    return (
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
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        id="password"
                        type={show === true ? "text" : "password"}
                    />
                    <span>
                        <label htmlFor="check-box">Show Password</label>
                        <input
                            value={show}
                            onChange={(e) => { setShow(e.target.checked) }}
                            type="checkbox"
                            name="register-checkbox"
                            id="check-box"
                        />
                    </span>
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            login(username, password);
                            navigate("/search");
                            console.log(e);
                        }}>Submit
                    </button>   
                </div>
            </form>
        </>
    )
}

export default LoginPage