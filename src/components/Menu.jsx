import React  from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Menu(){

    const navigate = useNavigate();

    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/search">Search</NavLink>
                </li>
                <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                </li>
                <li>
                    <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>;
                </li>
                <li>
                    <button className="btn btn-primary" onClick={() => navigate("/login")}>Logout</button>;
                </li>
                <li>
                    <button className="btn btn-primary" onClick={() => navigate("/register")}>Register</button>;
                </li>
            </ul>
        </nav>
        // need to conditional render
        // login or register button
        // or search favorites logout
    )
}

export default Menu;
