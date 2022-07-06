"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class gUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	gUser.init(
		{
			adminName: DataTypes.STRING,
			adminEmail: DataTypes.STRING,
			adminPhone: DataTypes.STRING,
			adminUsername: DataTypes.STRING,
			adminPassword: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "gUser",
		}
	);
	return gUser;
};
