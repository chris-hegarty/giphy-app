//*This file is where you will write database queries with async/await patterns:
//* Need functions for adding and removing favorites.
//*Need a function to get favorites by the userID.
//* We will also have a query to get all favorites from a user.
const query = require("../config/database.config");

async function add(favorite) {
	// console.log("anything here from the model file?");
	//set up try catch
	try {
		//* Add it to the database
		let { insertId } = await query(
			"INSERT INTO favorites (gif_id, user_id, title, url) VALUES (?,?,?,?)",
			[favorite.gif_id, favorite.user_id, favorite.title, favorite.url],
		);
		console.log("Process got here before insertID in favorite model");
		console.log(insertID);
		//* Send back the newly added item (with the auto-generated ID)
		return { success: true, data: { ...favorite, id: insertId }, error: null };
	} catch (err) {
		console.log("error in catch");
		// set up  return object
		return {
			success: false,
			data: null,
			error: "Something went wrong",
		};
	}
}

async function remove(gif_id, user_id) {
	try {
		await query("DELETE FROM favorites WHERE favorites.id = ?", [
			gif_id,
			user_id,
		]);
		return { success: true, data: "The GIF was deleted.", error: null };
	} catch (err) {
		return {
			success: false,
			data: null,
			error: "Something went wrong",
		};
	}
	//remove it
	//send back response
}

async function getByUser(user_id) {
	try {
		//! Get the favorites for that user
		const favorites = await query(
			"SELECT * FROM favorites where favorites.user_id = ?",
			[user_id],
		);
		//! send back a response (error or success)
		return { success: true, data: favorites, error: null };
	} catch (err) {
		console.log(err);
		return { success: false, data: null, error: "Something went wrong" };
	}
}

async function getAll() {
	try {
		//! Get the favorites for that user
		const favorites = await query("SELECT FROM favorites");
		//! send back a response (error or success)
		return { success: true, data: favorites, error: null };
	} catch (err) {
		return { success: false, data: null, error: "Something went wrong" };
	}
}

//*Now export the functions:
module.exports.add = add;
module.exports.remove = remove;
module.exports.getByUser = getByUser;
module.exports.getAll = getAll;

//*NOTES
//*Ask: What info do I need? The user id? The favorite to add?

//*PATTERNS
//*If you don't need data about the query:

//*await query("SQL REPLACING USER PROVIDED VALUES WITH ?S", [USER PROVIDED VALUES IN ORDER OF ])

//*IF you DO need data about the query
//* Like:
//* Id of added ?
//* Id of updated ?
//* Number of items deleted ?

//* await query("SQL REPLACING USER PROVIDED VALUES WITH ?S", [USER, PROVIDED, VALUES, IN, ORDER, OF, ?S])
