import React, {useState, useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext";
import useAxios from "../hooks/useAxios"
import SingleGif from "./SingleGif"

function SearchPage(){

   const navigate = useNavigate();
   const[searchResults, setSearchResults] = useState([]);
   const[rating, setRating] = useState();
    const [url, setUrl] = useState();
    const { data:gif, loading, error } = useAxios(url);

    //Need favorites context to pass down into SingleGif:
   const {favorites, add, remove} = useContext(FavoritesContext);
    console.log(gif);

    return(
        <>
            <form>
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

                <label htmlFor="rating-dropdown"></label>
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
                
                {gif && gif.map((g) => (
                    <>
                    <SingleGif 
                        gif={g}
                        add={gif.add}
                        remove={gif.remove}
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