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
		console.log(user);
		if (user) {
			return {
				success: false,
				data: null,
				error: "Username already exists. Please choose another.",
			};
		}
		//*Now if this returns false, go on to hash the password and query it into the database
		const hash = await bcrypt.hash(password, 10);
		await query("INSERT INTO users (password, username) VALUES(?,?)", [
			hash,
			username,
		]);
		return { success: true, data: "Thank you for registering!", error: null };
	} catch (err) {
		console.log(err);
		return {
			success: false,
			data: null,
			error: "Something went wrong. Please try again later.",
		};
	}
}

//* Login function

async function login(username, password) {
	console.log("Checking use model...");
	try {
		const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
			username,
		]);

		//*Return all the bad things if the username isnt in there:
		if (!user) {
			return { success: false, data: null, error: "Invalid username" };
		}
		//*Compare the password to the hashed version:
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return {
				success: false,
				data: null,
				error: "Invalid password.",
			};
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
module.exports.register = register;
