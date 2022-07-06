const express = require("express");
const route = express.Router();

const authMiddleware = require("../middleware/checkIfLogin");
const authController = require("../controller/auth.controller");
const adminController = require("../controller/admin.controller");

route.get("/", authMiddleware.checkIfLogin, (req, res) => {
	return res.render("login", { csrfToken: req.csrfToken() });
});

route.get("/login", authMiddleware.checkIfLogin, (req, res) => {
	return res.render("login", { csrfToken: req.csrfToken() });
});

route.post("/login", authController.authLogin);

route.get("/401", function (req, res) {
	return res.render("../view/401.hbs", {});
});

route.get("/maintenance", function (req, res) {
	return res.render("../view/maintenance.hbs", {});
});

route.get(
	"/dashboard",
	authMiddleware.checkNotLogin,
	adminController.adminPages
);

route.all("*", function (req, res, next) {
	return res.render("../view/404.hbs", {});
});

module.exports = route;
