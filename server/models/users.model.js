//*Need query functionality
const query = require("../config/database.config");
//*Need bcrypt to hash whatever password the user provides.
const bcrypt = require("bcrypt");

//Write async functions that return an object you'll pass to and use in the routes files.

async function register(username, password) {
	try {
		const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
			username,
		]);
		if (user) {
			return {
				success: false,
				data: null,
				error: "Username already exists. Please choose another.",
			};
		}
		//*Now if this returns false, go on to hash the password and query it into the database
		const hashWord = await brcrypt.hash(password, 10);
		await query("INSERT INTO users (password,username) VALUES(?,?)", [
			hashword,
			username,
		]);
		return { success: true, data: "Thank you for registering!", error: false };
	} catch (err) {
		return {
			success: false,
			data: null,
			error: "Something went wrong. Please try again later.",
		};
	}
}
