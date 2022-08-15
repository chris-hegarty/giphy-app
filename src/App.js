//*There are tons of changes that go in here when you are ready to hook up to the server.
//* In a nutshell: When app first loads,make a GET request to api/users/verify.
//* If it was a success, add that user to context, and make sure it doesn't retry.
//* setup a "loading" state so page doesn't flash.
//*You will need to import UserContext, and useState|useEffect|useContext from React.

import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Menu from "./components/Menu";
import LoginPage from "./components/LoginPage";
import FavoritesPage from "./components/FavoritesPage";
import RegisterPage from "./components/RegisterPage";
import SearchPage from "./components/SearchPage";
import ProtectedRoute from "./shared/ProtectedRoute";
import { UserContext } from "./context/UserContext";

function App() {
	//*set state for "loading" and get "verify" from UserContext:
	const [loading, setLoading] = useState(true);
	const { verify } = useContext(UserContext);
	useEffect(() => {
		async function init() {
			await verify();
			setLoading(false);
		}
		init();
	}, []);
	//*Ignore the dependency message...you only want this to run once when the app starts.
	//Now, if loading is true...return.
	if (loading) {
		return <></>;
	}
	return (
		<Router>
			<Menu />
			<header className="flex center">
				<div>
					<h1>Giphy Locker</h1>
					<h2>Find Them. Store Them. Sling Them.</h2>
				</div>
			</header>

			<Routes>
				<Route
					path="/login"
					element={
						<ProtectedRoute requiresLogin={false} component={<LoginPage />} />
					}
				/>

				<Route
					path="/register"
					element={
						<ProtectedRoute
							requiresLogin={false}
							component={<RegisterPage />}
						/>
					}
				/>

				<Route
					path="/search"
					element={
						<ProtectedRoute requiresLogin={true} component={<SearchPage />} />
					}
				/>

				<Route
					path="/favorites"
					element={
						<ProtectedRoute
							requiresLogin={true}
							component={<FavoritesPage />}
						/>
					}
				/>

				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
}

export default App;
