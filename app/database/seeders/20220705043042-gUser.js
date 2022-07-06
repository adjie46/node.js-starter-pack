"use strict";

const { uuid } = require("uuidv4");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("gUsers", [
			{
				id: uuid(),
				adminName: "Administrator",
				adminEmail: "admin@wasappanel.com",
				adminPhone: "6281269494591",
				adminUsername: "admin",
				adminPassword:
					"$2y$15$dCwkdbOLjLlodqsYAUu4Y.4FATpmzqh9GC1gCi4g944AIA3nonmy6",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
