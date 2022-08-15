const passport = require("passport");

async function auth(req, res, next) {
	passport.authenticate("jwt", (err, user, info) => {
		//*check if there's an error or no user
		if (err || !user) {
			return res.send({
				success: false,
				data: null,
				error: "Invalid credentials",
			});
		}
		//*Attach user to req object
		req.user = user;
		//*Moving to next step
		return next();
	})(req, res, next);
}

module.exports = auth;
