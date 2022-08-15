//* NOTE!!!! For login routes, you’ll need to
//*1)Set up passport.config.js then
//*2)Set up auth.middleware.js then
//*3)Add const auth = require("../middleware/auth.middleware"); or whatever the path to the middleware file is.

const express = require("express");
// *Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
//* It can create router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.
//* https://expressjs.com/en/guide/routing.html
const router = express.Router();
//See note above about this line:
const auth = require("../middleware/auth.middleware");
//*You'll need the jsonwebtoken package: (https://www.npmjs.com/package/jsonwebtoken)
const jwt = require("jsonwebtoken");
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
	//*IF the username and password come back from the database(model) and make it through the "verify" function
	//*  take the userid and username and store and hash into jwt using json web token pkg. Remember, the "success" key comes back true or false.
	//*If it comes back true:
	if (resObj.success) {
		//*get the use from response object's data key:
		const user = resObj.data;
		//*And make a token using the jsonwebtoken pkg.
		//* It needs the user, your secret key and any options.(https://www.npmjs.com/package/jsonwebtoken)
		//* Here, we set it to expire in two days.
		const token = jwt.sign(user, process.env.SECRET_KEY, {
			expiresIn: "2 days",
		});
		//* Make cookie. Express .cookie() method: https://expressjs.com/en/api.html#res.cookie
		//*It needs a name as a string, a value (Which is the jwt we just created), and in the options object, we'll set it to httpOnly, meaning it's only available through a call to the server.
		res.cookie("jwt", token, { httpOnly: true });
	}
	res.send(resObj);
});

//*For verify, we'll use a GET request

router.get("/verify", auth, (req, res) => {
	return res.send({
		success: true,
		data: {
			username: req.user.username,
			id: req.user.id,
		},
		error: null,
	});
});

module.exports = router;
