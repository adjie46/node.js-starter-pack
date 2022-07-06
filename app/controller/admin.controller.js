const config = require("../config/config");

function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}

	return true;
}

exports.adminPages = async (req, res) => {
	let pages = req.query;
	let dataDashboard = {};

	if (isEmpty(pages)) {
		dataDashboard.curent_pages = "dashboard";
	} else {
		dataDashboard.curent_pages = pages.pages;
	}

	return res.render("admin", {
		csrfToken: req.csrfToken(),
		data: dataDashboard,
		baseUrl: config.baseUrl,
		tokenAdmin: req.session.tokenAdmin,
	});
};
