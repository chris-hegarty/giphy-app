// import React, { useState, createContext, useCallback  } from "react";

import React, { useState, createContext, useCallback } from "react";
export const FavoritesContext = createContext(null);

export function FavoritesProvider(props){
// -Favorites
const [favorites, setFavorites]= useState([]);

// -Add (function) - takes in gif and adds to the array.
const add = useCallback(
    // take the gif and do something to it
    (gif) => {
        setFavorites( (curr) => [...curr, gif]);
    }, [setFavorites]
    
);

//   removeById: useCallback((id) =>
//       setValue((arr) => arr.filter((v) => v && v.id !== id))
//     ),
const remove = useCallback(
    (id) => {
        setFavorites( (curr) => curr.filter( (val) => {return (val.gif_id !== id);} ))
    },[setFavorites]
);

const clear = useCallback(
    () => {
        setFavorites([]);
    }
,[setFavorites]);

return (
    <FavoritesContext.Provider value={{favorites, add, remove, clear}}>

        {props.children}
        
    </FavoritesContext.Provider>
    
)
}