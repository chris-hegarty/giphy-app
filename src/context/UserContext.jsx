
import React, { useState, createContext, useCallback } from "react";
export const UserContext = createContext(null);

export function UserProvider(props){
    //state and functionallity goes here:
    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = useCallback(
        (username) => {
            setLoggedInUser(username);
        },
        [setLoggedInUser]
     );
     const logout = useCallback( ()=> {
        setLoggedInUser(null);
     }, [setLoggedInUser]

     );

     return <UserContext.Provider value={ {loggedInUser, login, logout} } >
     
     {props.children}

     </UserContext.Provider>

}