import React, { useState, createContext, useCallback } from "react";
//*need to add axios here:
import axios from "axios";
export const UserContext = createContext(null);

export function UserProvider(props) {
	//state and functionality goes here:
	const [loggedInUser, setLoggedInUser] = useState("Chris");
	//*add and update functions:

	//*Here is a new register function.
	//* Your RegisterPage.jsx will call this function.
	//*The request goes to the route set up in route file, then to model, then response back from model to route
	const register = useCallback(async (username, password) => {
		console.log("anything here from UserContext?");
		try {
			const response = await axios.put("/api/users/register", {
				username,
				password,
			});
			console.log(response.data);
			if (response.data.success) {
				console.log("Registration successful");
			} else {
				console.log(response.data.error);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	//*Add verify function
	//*****This will set your logged in user*****
	const verify = useCallback(async () => {
		try {
			const response = await axios.get("/api/users/verify");
			if (response.data.success) {
				setLoggedInUser(response.data.data);
			}
		} catch (err) {
			console.log(err);
		} finally {
			return true;
		}
	}, [setLoggedInUser]);

	//* Update login function:

	const login = useCallback(
		async (username, password) => {
			try {
				const response = await axios.post("/api/users/login", {
					username,
					password,
				});

				if (response.data.success) {
					setLoggedInUser(response.data.data);
				} else {
					console.log(response.data.error);
				}
			} catch (err) {
				console.log(err);
			}
		},
		[setLoggedInUser],
	);

	//*Here, we make a GET request to api/users/logout, THEN clear state.
	//*This is so we can clear the cookie on logout.
	//*It goes to the route, where logout does res.Cookie logout
	const logout = useCallback(async () => {
		try {
			const response = await axios.get("/api/users/logout");
			if (response.data.success) {
				setLoggedInUser(null);
			}
		} catch (err) {
			console.log(err);
		}
	}, [setLoggedInUser]);

	return (
		<UserContext.Provider
			value={{ loggedInUser, login, logout, verify, register }}
		>
			{props.children}
		</UserContext.Provider>
	);
}
