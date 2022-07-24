import React, {useState, createContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import useAxios from "../hooks/useAxios"
import { FaHeart } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function SearchPage(){

   const navigate = useNavigate();
    const[searchResults, setSearchResults] = useState([]);
   const[rating, setRating] = useState();
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState();
    const [query, setQuery] = useState("");
    const { data, loading, error } = useAxios(url);

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
                    console.log(); 
                }}
            
                >
                SUBMIT
            </button>
        </form>
        <div className="parent-section flex flex-wrap">
            {data && data.map((data, idx) => (
            <div key={idx}>
                <img
                    onClick={(data) => (data)}
                    src={data.url} 
                    alt={data.title}
                    />

                    {
                        <>
                    <button 
                    className="add-favorite"
                    onClick={( (e)=>{
                        
                    }  
                    )}
                    >
                                < AiOutlineHeart />
                    </button>
                    <button
                                className="remove-favorite"
                                onClick={((e) => {

                                }
                                )}
                    >
                                < AiFillHeart />
                    </button>
                    </>
                    
                    
            }
            </div>
            
            ))}
        </div>
        </>
        
    )
}

export default SearchPage