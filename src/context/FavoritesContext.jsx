import React, {
	useState,
	useCallback,
	createContext,
	useContext,
	useEffect,
} from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const FavoritesContext = createContext(null);

export function FavoritesProvider(props) {
	const [favorites, setFavorites] = useState([]);
	const { loggedInUser } = useContext(UserContext);

	//* Need UseEffect - When logged in user changes, pull in their favorites.
	useEffect(() => {
		//*if logged in user is not null
		if (!loggedInUser) {
			return;
		}
		async function init() {
			try {
				//* Attempt to make a GET request to favorites
				const response = await axios.get(`/api/favorites/user`);
				//* If it was successful, setFavorites with the data we got back.
				if (response.data.success) {
					setFavorites(response.data.data);
				}
			} catch (err) {
				console.log(err);
			}
		}
		init();
	}, [loggedInUser]);

	const add = useCallback(
		async (gif) => {
			// console.log(gif);
			try {
				const response = await axios.put("/api/favorites/add", gif);
				if (response.data.success) {
					setFavorites((curr) => [...curr, response.data.data]);
				}
				// console.log(response.data);
			} catch (err) {
				console.log(err);
			}
		},
		[setFavorites],
	);

	//*Updated to connect to server/db
	//*Make an API call DELETE api/favorites/delete/${loggedInUser.id}
	const remove = useCallback(
		async (gif_id) => {
			try {
				const response = await axios.delete(`/api/favorites/delete/${gif_id}`);
				if (response.data.success) {
					setFavorites((curr) => curr.filter((val) => val.gif_id !== gif_id));
				}
			} catch (err) {
				console.log(err);
			}
		},
		[setFavorites],
	);

	const clear = useCallback(() => {
		setFavorites([]);
	}, [setFavorites]);

	return (
		<FavoritesContext.Provider value={{ favorites, add, remove, clear }}>
			{props.children}
		</FavoritesContext.Provider>
	);
}
