const config = require("../config/config");
const jwt = require("jsonwebtoken");

function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}

	return true;
}

async function getDataToken(token) {
	return new Promise(async (resolve, reject) => {
		jwt.verify(token, config.jwtSecret, function (err, decoded) {
			if (err) {
				reject(err.message);
			} else {
				resolve(decoded);
			}
		});
	});
}

exports.adminPages = async (req, res) => {
	let pages = req.query;
	let dataDashboard = {};

	dataDashboard.active_menu = "";

	if (isEmpty(pages)) {
		dataDashboard.curent_pages = "dashboard";
		dataDashboard.active_menu = "active";
	} else {
		if (pages.page == "plan") {
			dataDashboard.page = "plan";
		} else if (pages.page == "user") {
			dataDashboard.page = "user";
		}

		dataDashboard.curent_pages = pages.pages;
	}

	dataDashboard.current_login = await getDataToken(req.session.tokenAdmin);

	return res.render("admin", {
		csrfToken: req.csrfToken(),
		data: dataDashboard,
		baseUrl: config.baseUrl,
		tokenAdmin: req.session.tokenAdmin,
	});
};
