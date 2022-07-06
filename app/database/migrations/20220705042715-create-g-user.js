"use strict";

var DataTypes = require("sequelize/lib/data-types");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("gUsers", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			adminName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			adminEmail: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			adminPhone: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			adminUsername: {
				type: Sequelize.STRING,
			},
			adminPassword: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			updatedAt: {
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("gUsers");
	},
};
