import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { UserContext } from "../context/UserContext";
import SingleGif from "./SingleGif";

//an array to contain the favorites has been created with state in Favorites context.
// const [favorites, setFavorites]= useState([]);
//Favorites context with the functions to change the array is imported above.

function FavoritesPage(){
    const {favorites, add, remove}= useContext(FavoritesContext);
    const { loggedInUser } = useContext(UserContext);
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
                            isFavorite={true}
                        />
                    )
                    )
                }

        </div>
        </>
    )
}

export default FavoritesPage;