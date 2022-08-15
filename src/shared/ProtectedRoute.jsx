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

// down after return, here is what is going that has to be written here because commenting makes no sense at all anymore
//If compnenet functyion comes back trye...go to component
//if iit does nit comne bacjk as true, navigate to the reidrecv345 fdsijnerstoijfadsDFGS

function ProtectedRoute({requiresLogin, component}){
	//bring loggedInUser state from UserContext
	const { loggedInUser } = useContext(UserContext);
	//set up "redirect" and "authorized" functions and memoize the results
	//useMemo is a function that takes in another function and an array as arguments

	// set up function to redirect unauthorized or users who are not logged in:
	const redirect = useMemo(
		// if requiresLogin is true, redirect to login
		//  otherwise redirect to search
		() => (requiresLogin ? "/login" : "/search"),
		//only recalculate if requiresLogin is true
		[requiresLogin],
	);

	//set up function to store authorized user:
	const authorized = useMemo(() => {
		return (requiresLogin && loggedInUser) || (!requiresLogin && !loggedInUser);
	}, [requiresLogin, loggedInUser]);

	return (
		<>
			{!authorized && <Navigate to={redirect} />}
			{authorized && <>{component}</>}
		</>
	);
}

export default ProtectedRoute;