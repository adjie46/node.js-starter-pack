const model = require("../database/models/index");
const responseStatus = require("../helper/responseStatus");
const message = require("../helper/responseMessage");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EXPIRES_IN_MINUTES = "1d";

async function getHasPassword(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const datas = await model.gUser.findOne({
				where: {
					adminUsername: data.username,
				},
			});
			resolve(datas);
		} catch (error) {
			reject(error);
		}
	});
}

exports.authLogin = async (req, res, next) => {
	data = req.body;

	username = data.username;
	password = data.password;

	if (username == "" || password == "") {
		req.flash("message", "Username Or Password Can't be empty");
		return res.render("../view/login.hbs", {
			status: 2,
			isDisable: "disabled",
			type: "Oh No! ",
			messageIcon: "close",
			messageType: "danger",
			csrfToken: req.csrfToken(),
			message: req.flash("message"),
		});
	} else {
		let hasPassword = await getHasPassword(data);

		if (hasPassword != null) {
			let valid = bcrypt.compareSync(data.password, hasPassword.adminPassword);

			if (valid) {
				const payload = {
					adminId: hasPassword.id,
					admiName: hasPassword.adminName,
					adminEmail: hasPassword.adminEmail,
					adminPhone: hasPassword.adminPhone,
				};

				const signInToken = jwt.sign(payload, config.jwtSecret, {
					expiresIn: EXPIRES_IN_MINUTES,
				});

				session = req.session;
				session.tokenAdmin = signInToken;

				req.flash("message", "Login Success");
				res.set({ Refresh: "2; url=/dashboard" });
				return res.render("../view/login.hbs", {
					status: 1,
					isDisable: "disabled",
					type: "Success ",
					messageIcon: "mdi mdi-check-all",
					messageType: "success",
					message: req.flash("message"),
				});
			} else {
				req.flash("message", "Your Password Wrong!");
				return res.render("../view/login.hbs", {
					status: 2,
					isDisable: "disabled",
					type: "Oh No! ",
					messageIcon: "mdi-block-helper",
					messageType: "danger",
					csrfToken: req.csrfToken(),
					message: req.flash("message"),
				});
			}
		} else {
			req.flash("message", "User Not Found!");
			return res.render("../view/login.hbs", {
				status: 2,
				isDisable: "disabled",
				type: "Oh No! ",
				messageIcon: "mdi-block-helper",
				messageType: "danger",
				csrfToken: req.csrfToken(),
				message: req.flash("message"),
			});
		}
	}
};
