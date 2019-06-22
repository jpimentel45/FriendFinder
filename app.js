// Full Documentation - https://www.turbo360.co/docs
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });

const app = vertex.express(); // initialize app
var express = require("express");

var apps = express();
const path = require("path");
/*  
	Apps can also be initialized with config options as shown in the commented out example below. Options
	include setting views directory, static assets directory, and database settings. To see default config
	settings, view here: https://www.turbo360.co/docs 

const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		url: (process.env.TURBO_ENV == 'dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
		type: 'mongo',
		onError: (err) => {
			console.log('DB Connection Failed!')
		},
		onSuccess: () => {
			console.log('DB Successfully Connected!')
		}
	}
}

const app = vertex.app(config) // initialize app with config options

*/

// var PORT = process.env.PORT || 8080;
// // set up a listener
// app.listen(PORT, function() {
//   console.log("app listen on port: ", PORT);
// });

// import routes
const index = require("./app/routes/htmlRoutes");
const api = require("./app/routes/apiRoutes");

// set routes
// express middleware for serving static files
app.use(express.static("app/public"));
app.use("/", index);
app.use("/api", api); // sample API Routes
apps.use(express.static("public"));
module.exports = app;
