import React, {useState, createContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import Axios  from "axios";



function SearchPage(){

   const navigate = useNavigate();
    const[searchResults, setSearchResults] = useState([]);
   const[rating, setRating] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    return(
        <form>
            <label htmlFor="search-bar">Search</label>
            <input 
            value={searchResults}
            onChange={(e)=>{}}
            type="search" 
            name="searchBar" 
            id="search-bar" 
            />

            <button
            type="submit"
            onClick={(e)=>{}}
            >
                SUBMIT
            </button>
        </form>
    )
}

export default SearchPage