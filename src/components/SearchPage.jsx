import React, { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext";
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
    // console.log(gifs);

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
            <div className="parent-section flex flex-wrap">
                {error && error}
                {gifs &&
                    gifs.length > 0 &&
                gifs.map((val) => (
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

export default SearchPage