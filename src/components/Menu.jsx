
import { NavLink } from "react-router-dom";

function Menu(){ 
    
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
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </nav>

        // if not logged in dont show search or FavoritesContext
        // if logged in show search/favorites and logout
    )
}

export default Menu;
