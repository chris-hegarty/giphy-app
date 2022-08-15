const express = require("express");
// *Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
//* It can create router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.
//* https://expressjs.com/en/guide/routing.html
const router = express.Router();
//Bring in the register and login functions from the model file:
const { register, login } = require("../models/users.model");

//*Need three routes for register, login and verify.
//*Need a function to verify data.
//*Build functions that return the response object that you'll use in here.
//* Those functions, or models, can be written in here, but it's better to write them in separate model files.

//*Create a function to verify username and password requirements.
//*it will return boolean true if the requirements were met.

function verifyData(username, password) {
	if (!username || username.length < 4 || username.length > 20) {
		return false;
	}
	if (!password || password.length < 8 || password.length > 30) {
		return false;
	}
	return true;
}

//* For "register" we are creating new tables in the DB, so use PUT:

router.put("/register", async (req, res) => {
	//*Get the username and password from the response body
	//*Object destructuring here:
	const { username, password } = req.body;
	//*use verify function here. You'll send out an object either way:
	if (!verifyData(username, password)) {
		return res.send({
			success: false,
			data: null,
			error:
				"Please check that your username and password meet the requirements.",
		});
	}
	//* If the username and password meet the requirements, put them in an object:
	const resObj = await register(username, password);
	res.send(resObj);
});

//For the login route we are using the post request:
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!verifyData(username, password)) {
		return res.send({
			success: false,
			data: null,
			error: "Username and/or password do not match.",
		});
	}
	const resObj = await login(username, password);
});

module.exports = router;
