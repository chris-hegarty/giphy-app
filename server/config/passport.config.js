//* 1. Add a JWT strategy.
//*Extract JWT from cookie
//*Set up configuration options
//* Build strategy

//* Need to already have installed passport and passport-jwt.

const passport = require("passport");
const { Strategy } = require("passport-jwt");
//*add query object from database config
const query = require("./database.config");

//*We will extract the jwt from a cookie.
//*So we need a custom extractor function: https://www.npmjs.com/package/passport-jwt

let cookieExtractor = function (req) {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["jwt"];
	}
	return token;
};
//*The JWT authentication strategy is constructed as follows:
//* new JwtStrategy(options, verify)
//* options is an object literal, so we are storing the options into a variable:
const jwtOptions = {
	secretOrKey: process.env.SECRET_KEY,
	jwtFromRequest: cookieExtractor,
};
//* https://www.passportjs.org/packages/passport-jwt/
//* passport.use(new JwtStrategy(opts, function(jwt_payload, done) {}
//* "payLoad" is object with encrypted information from JWT.
passport.use(
	"jwt",
	new Strategy(jwtOptions, async (payLoad, done) => {
		//* Set up try catch and tgry to q the db where users.id = payLoad.id
		try {
			const [user] = await query("SELECT * FROM users WHERE users.id = ?", [
				payLoad.id,
			]);
			//* If there isn't a user, fire done function.
			//* (Null, false, "No valid user")
			if (!user) {
				return done(null, false, "No user found.");
			}
			//* If there is a user, return done(null, user)
			//* You dont need another if statement like if(user){ }.
			//*You can just return here
			return done(null, user);
		} catch (err) {
			return done(true, false, "Invalid credentials provided.");
		}
	}),
);
//* Finally, export the passport object you set up!

module.exports = passport;
