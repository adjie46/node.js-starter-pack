module.exports = function (express) {
	const route = express.Router();
	const authController = require("../middleware/checkIfLogin");
	//const adminController = require("../controller/admin.controller");

	route.get("/", authController.checkIfLogin, (req, res) => {
		return res.render("login", { csrfToken: req.csrfToken() });
	});

	route.get("/login", authController.checkIfLogin, (req, res) => {
		return res.render("login", { csrfToken: req.csrfToken() });
	});

	//route.get("/admin", authController.checkNotLogin, adminController.adminPages);
	//route.get("/maintenance", adminController.maintenancePage);

	route.get("/401", function (req, res) {
		return res.render("../view/401.hbs", {});
	});

	route.all("*", function (req, res, next) {
		return res.render("../view/404.hbs", {});
	});

	return route;
};
