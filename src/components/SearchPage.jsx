import React, { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios"
import SingleGif from "./SingleGif"

function SearchPage(){

//    const navigate = useNavigate();
    const[search, setSearch] = useState("");
    const{searchResults, setSearchResults} = useContext(SearchContext);
    const { favorites, add, remove } = useContext(FavoritesContext);
    const[rating, setRating] = useState("g");
    const [url, setUrl] = useState("");
    const { data:gifs, error } = useAxios(url);
    //Here, you are taking the "favorites" array from Favorites Context.
    //You are mapping over each one and getting its ID
    //Then you are "memoizing" the result b/c it eventually could be a heavy computation.
    //You are then going to use "favoriteList" in SingleGif to keep track of which single gif has been favorited.
      const favoriteList = useMemo(
    () => favorites.map((val) => val.gif_id),
        [favorites]
  );

    useEffect(() => {
        if (gifs) {
            setSearchResults(gifs);
        }
    }, [gifs, setSearchResults]);

    return(
        <>
            <form className="flex">
                <div className="search-input grow flex column">
                <label htmlFor="search-bar">Search</label>
                <input 
                value={search}
                onChange={(e)=>{
                    setSearch(e.target.value)
                }}
                type="search" 
                name="searchBar" 
                id="search-bar" 
                />
                </div>
                <div className="rating-submit flex column">
                <label htmlFor="rating-dropdown">Choose a Rating:</label>
                <select 
                name="rating" 
                id="rating-dropdown" 
                value={rating}
                onChange={ 
                    (e) => {
                        setRating(e.target.value)
                    } 
                }
                >
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg-13">PG-13</option>
                    <option value="r">R</option>
                </select>
                </div>

                <button
                    onClick={(e)=>{
                        e.preventDefault();

                        setUrl(`${rating}&q=${search}`);
                        
                    }}
                    type="submit"
                    >
                    SUBMIT
                </button>
                
            </form>
            <div className="parent-section">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }} >
                    <Masonry columnsCount={4} gutter={"4"}>
                {error && error}
                {gifs &&
                    gifs.length > 0 &&
                gifs.map((val) => (
                    
                    <SingleGif 
                        gif={val}
                        add={add}
                        remove={remove}
                        key={val.gif_id}
                        //You want to keep track of whether this single gif is a favorite or not.
                        //SO you set up a prop (React word for variable you want to keep track of) called "isFavorite"
                        //You then grab the "favoriteList" array you set up at the top of this file.
                        //And you say that "isFavorite" will be true if that gifId is in the list.
                        //YOu can then use this boolean in a conditional in the singleGif component.
                        isFavorite={ favoriteList.includes(val.gif_id)  }
                    />
                    
                )
                )
            }
                    </Masonry>
            </ ResponsiveMasonry>
            </div>
        </>
        )
        
}

export default SearchPage

//PATTERN for renaming an object key:

// As long as you use the same variable name in your destructured variables as is in the object it will work perfectly.

// Luckily, you can also easily rename variables as well.If you wanted the name variable to be called firstName instead you can do the following.
// const person = { name: 'Kyle', age: 25 }
// const { name: firstName, age } = person

// console.log(firstName)
// // Kyle
// console.log(age)
// // 25
// This is essentially saying that you are mapping the property name from the object person to a new variable called firstName.