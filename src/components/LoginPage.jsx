import React, { useContext, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";// import {  } from "module";

function LoginPage() {
    //local pieces of state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [show, setShow] = useState(false);
    //global pieces of state from context file
    const [show, setShow] = useState(false);
    const { login } = useContext(UserContext)

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

                        }}>Submit
                    </button>   
                </div>
            </form>
        </>
    )
}

export default LoginPage