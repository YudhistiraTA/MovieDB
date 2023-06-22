"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Genres", [
			{
				name: "Animation",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: "Action",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: "Horror",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: "Comedy",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Genres", null, {});

	}
};
