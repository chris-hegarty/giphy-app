import React, {useState, useContext} from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import {FavoritesContext} from "../context/FavoritesContext";
// import useAxios from "../hooks/useAxios"
import SingleGif from "../components/SingleGif"

//an array to contain the favorites has been created with state in Favorites context.
// const [favorites, setFavorites]= useState([]);
//Favorites context with the functions to change the array is imported above.

function FavoritesPage(props){
    const {favorites, add, remove}= useContext(FavoritesContext);

    return(
        <>
        <div className="parent-section flex flex-wrap">
                {favorites &&
                    favorites.length > 0 &&
                    favorites.map((val) => (
                        <SingleGif
                            gif={val}
                            add={add}
                            remove={remove}
                            key={val.gif_id}
                        />
                    )
                    )
                }

        </div>
        </>
    )
}

export default FavoritesPage;