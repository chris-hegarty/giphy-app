import React, { useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoute(requiresLogin, component){
    //bring loggedInUser state from UserContext
   const{loggedInUser} = useContext(UserContext)
   //set up "redirect" and "authorized" functions and memoize the results
   //useMemo is a function that takes in another function and an array as arguments
   const redirect = useMemo( 
        // if requiresLogin is true, redirect to login
    //  otherwise redirect to search
       () => (requiresLogin ? "/login" : "/search") 
            //only recalculate if requiresLogin is true
   ,[requiresLogin]
   )

   const authorized = useMemo ( 
    () => {
        return (requiresLogin && loggedInUser) || (!requiresLogin && !loggedInUser);
       }, [requiresLogin, loggedInUser]
   )

   return(
        <>
           {/* if not authorized, use Navigate to call redirect function to go to login or search */}
            {!authorized && <Navigate to={redirect} />}
            {/* if authorized, navigate to component. Wrap the component in fake html parent element */}
            {authorized && <>{component}</> }
        </>


    

    
   )



}