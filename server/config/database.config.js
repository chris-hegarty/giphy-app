//Get mySQL, util for promisify and pool connections.

const mysql = require("mysql");
const util = require("util");
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});

//*set up pool connections:

pool.getConnection((err, connection) => {
	//*For err param, you have one if, containing three other ERROR CODE ifs:
	if (err) {
		console.log(err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			console.error("Database connection was closed");
		}
		if (err.code === "ER_CON_COUNT_ERROR") {
			console.error("Database connection limit exceeded");
		}
		if (err.code === "ECONNREFUSED") {
			console.error("Database connection was refused");
		}
	}
	if (connection) {
		connection.release();
	}
});

//*Add promisify and set up query object to avoid callback hell:
const query = util.promisify(pool.query).bind(pool);

module.exports = query;
