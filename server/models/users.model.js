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

//* Login function

async function login(username, password) {
	try {
		const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
			username,
		]);
		//*Return all the bad things if the username isnt in there:
		if (!user) {
			return { success: false, data: null, error: "Invalid username" };
		}
		//*Compare the password to the hashed version:
		const match = await bcrypt.compare(password, user.username);
		if (!match) {
			return { success: false, data: null, error: "Invalid password." };
		}
		//*if all the info is good, return the username and user ID in an object:
		return {
			success: true,
			data: { username: user.username, id: user.id },
			error: null,
		};
	} catch (err) {
		return { success: false, data: null, error: "Something went wrong." };
	}
}

//*Export the functions so you can call them in the routes:
module.exports.login = login;
module.exports.register - register;
