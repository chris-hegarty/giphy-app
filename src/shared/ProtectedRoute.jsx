import React, { useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


//You will use this Protected Route component to set the element piece of the routes/urls/components where it is needed. (in App.js)

//The route may initially look like this, where the element simply equals the component.

/* { <Route
    path="/login"
    element={<LoginPage />}>
</Route> } */

//You'll drop this <ProtectedRoute /> component into the element piece.
//The component arg is just which component  you want to go to.
//The requiresLogin arg will be set to true or false.
//With the login example, the component is login, and requiresLogin is set to false, like

/* { <Route
    path="/login"
    element={
        <ProtectedRoute requiresLogin={false} component={<LoginPage />} />
    }
/> } */

function ProtectedRoute(requiresLogin, component){
    
    //bring loggedInUser state from UserContext
   const{loggedInUser} = useContext(UserContext)
   //set up "redirect" and "authorized" functions and memoize the results
   //useMemo is a function that takes in another function and an array as arguments
   
   //set up function to store authorized user:
    const authorized = useMemo(
        () => {
            return (requiresLogin && loggedInUser) || (!requiresLogin && !loggedInUser);
        }, [requiresLogin, loggedInUser]
    )
   
   // set up function to redirect unauthorized or users who are not logged in:  
    const redirect = useMemo( 
        // if requiresLogin is true, redirect to login
    //  otherwise redirect to search
       () => (requiresLogin ? "/login" : "/search") 
            //only recalculate if requiresLogin is true
   ,[requiresLogin]
   )

   return(
        <>
           {/* if not authorized, use "Navigate" to call redirect function to go to login or search */}
            {!authorized && <Navigate to={redirect} />}
            {/* if authorized, navigate to component. Wrap the component in fake html parent element */}
            {authorized && <>{component}</> }
        </>
    
   )

}

export default ProtectedRoute;