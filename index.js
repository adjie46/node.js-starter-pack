const express = require("express");
const route_view = require("./app/routes/route_view.routes");
const routes = require("./app/routes/routes");
const config = require("./app/config/config");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
var csrf = require("csurf");

const app = express();

const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(
	cors({
		origin: "*",
	})
);

app.use(
	bodyParser.json({
		limit: "1000mb",
	})
);
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "1000mb",
	})
);

app.use(
	"/assets",
	express.static(__dirname + "/public", {
		etag: false,
	})
);

hbs.registerPartials(__dirname + "/app/view/includes/");
hbs.registerPartials(__dirname + "/app/view/pages/");
hbsutils.registerWatchedPartials(__dirname + "/app/view/includes/");
hbsutils.registerWatchedPartials(__dirname + "/app/view/pages/");
hbsutils.precompilePartials();
app.set("views", path.join(__dirname, "app/view/"));
app.disable("views cache");
app.set("view engine", "hbs");

//FUNCTION
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("ifNotEquals", function (arg1, arg2, options) {
	return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("ifAnd", function (v1, v2, options) {
	if (v1 === v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

hbs.registerHelper("inc", function (value, options) {
	return parseInt(value) + 1;
});

app.use(
	session({
		cookie: {
			maxAge: Date.now() + 1000 * 60 * 60 * 24,
		},
		secret: config.jwtSecret,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(flash());
app.use((req, res, next) => {
	app.locals.status = req.flash("status");
	app.locals.message = req.flash("message");
	app.locals.messageType = req.flash("messageType");
	app.locals.messageIcon = req.flash("messageIcon");
	app.locals.messageIcon = req.flash("type");
	next();
});
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(function (err, req, res, next) {
	if (err.code !== "EBADCSRFTOKEN") return next(err);

	// handle CSRF token errors here
	res.status(401);
	res.redirect("/401");
});

app.use("/", routes);
//app.use("/", route_view(express));

// START SERVER
const startServer = http.createServer(app).listen(config.port);

if (startServer) {
	console.log(`your server is running on port ${config.port}`);
}
