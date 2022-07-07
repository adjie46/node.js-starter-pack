const saltRounds = 10;
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const EXPIRES_IN_MINUTES = "1d";
const jwt = require("jsonwebtoken");

exports.checkIfLogin = async (req, res, next) => {
	let session = req.session;

	if (config.mode == "Maintenance") {
		res.status(200);
		return res.redirect("/maintenance");
	} else if (session.tokenAdmin) {
		res.status(200);
		return res.redirect("/dashboard");
	}

	next();
};

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

exports.checkToken = async (req, res, next) => {
	let session = req.session;

	if (!session.tokenAdmin) {
		res.status(200);
		return res.redirect("/");
	} else {
		getDataToken(session.tokenAdmin)
			.then((data) => {
				session.data = data;
				next();
			})
			.catch((err) => {
				delete req.session.tokenAdmin;
				return res.redirect("/login");
			});
	}
};

exports.checkNotLogin = async (req, res, next) => {
	let session = req.session;

	if (config.mode == "Maintenance") {
		res.status(200);
		return res.redirect("/maintenance");
	} else if (!session.tokenAdmin) {
		res.status(200);
		return res.redirect("/");
	}

	next();
};
