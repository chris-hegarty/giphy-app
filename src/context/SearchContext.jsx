import React, { useState, createContext, useCallback } from "react";
export const SearchContext = createContext(null);

export function SearchProvider(props){
//set default value to empty array.
    const [searchResults, setSearchResults] = useState([]);

    return <SearchContext.Provider value={ {searchResults, setSearchResults} } >

        {props.children}

        </SearchContext.Provider>

}