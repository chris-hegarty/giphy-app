import React, { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios"
import SingleGif from "./SingleGif"

function SearchPage(props){

   const navigate = useNavigate();
   const{searchResults, setSearchResults} = useContext(SearchContext);
    const { favorites, add, remove } = useContext(FavoritesContext);
   const[rating, setRating] = useState();
    const [url, setUrl] = useState();
    const { data:gifs, loading, error } = useAxios(url);
    console.log(gifs);

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
                value={searchResults}
                onChange={(e)=>{
                    setSearchResults(e.target.value);
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
                    type="submit"
                    onClick={(e)=>{
                        e.preventDefault();
                        setUrl(`&q=${searchResults}&rating=${rating}`);
                    }}
                
                    >
                    SUBMIT
                </button>
                
            </form>
            <div className="parent-section flex flex-wrap">
                {/* if search results  */}
                
                {gifs && gifs.map((g) => (
                    <>
                    <SingleGif 
                        gif={g}
                        add={add}
                        remove={remove}
                        key={g.id}
                    />
                    </>
                    )
                )
            }
            </div>
        </>
        )
        
}

export default SearchPage