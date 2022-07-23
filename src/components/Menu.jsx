
import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

import { FavoritesContext } from "../context/FavoritesContext";
import { SearchContext } from "../context/SearchContext";
import { UserContext } from "../context/UserContext";


function Menu(){ 
    //Need the following pieces for the logged out button:
    //loggedInUser && logout from UserConetxt
    const{loggedInUser, logout} = useContext(UserContext);
    //the search results array from SearchContext
    const{setSearchResults}= useContext(SearchContext);
    // the clear function to clear the favorites array 
    const{clear} = useContext(FavoritesContext)

    //Logged IN users should see:
    //Search
    //Favorites
    //Logout

    //Logged OUT users should see 
    //Register
    //Login
    
    return(
        <nav>
            <ul>
        {/* //start here with list items/menu items you want logged in users to see. Note: starting with not logged in users will not work. 
        //For cleaner code, use && pattern.
        //Still need parent element...even though it's in the middle of the page ????????????>?? */}
        {loggedInUser && (
                <>
                <li>
                    <NavLink to={"/search"}>Search</NavLink>
                </li>
                <li>
                    <NavLink to={"/favorites"}>Favorites</NavLink>
                </li>
                <li>
                    <NavLink 
                    // on clicking logout, fire 
                    // -the logout function from UserContext
                    // -the clear function from FavoritesContext
                    //- And set search results back to an empty array with setSearchResults from Search Results context
                    onClick={() => {
                        clear()
                        setSearchResults()
                        logout()
                    }}
                    //  redirect back to login page
                    to={"/logout"}
                    >Logout</NavLink>
                </li>
                </>
            )
        }
        {/* Now set what the NOT loggedin user sees:  */}
        {!loggedInUser && (
            <>
                <li>
                    <NavLink>

                    </NavLink>
                </li>
                <li>
                    <NavLink>

                    </NavLink>

                </li>
            </>
        )

        }
            </ul>
        </nav>








        // {(!loggedInUser) ?? (
        //     <>
            
        //     </>
        // )

        // }











        // <nav>
        //     <ul>
        //         <li>
        //             <NavLink to="/search">Search</NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/favorites">Favorites</NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/login">Login</NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/register">Register</NavLink>
        //         </li>
        //     </ul>
        // </nav>

        // if not logged in dont show search or FavoritesContext
        // if logged in show search/favorites and logout
    )
}

export default Menu;
