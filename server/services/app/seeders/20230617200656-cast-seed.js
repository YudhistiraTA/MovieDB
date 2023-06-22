"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("Casts", [
			{
				id: 1,
				MovieId: 1,
				name: "Shameik Moore",
				profilePict:
					"https://resizing.flixster.com/61R41C31mcot1BQjksY6TXrvnf8=/100x120/v2/https://flxt.tmsimg.com/assets/692922_v9_bb.jpg",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 2,
				MovieId: 2,
				name: "Chris Pratt",
				profilePict:
					"https://resizing.flixster.com/MOBKRyYrsYM7BV8SMC3eIXmTj58=/100x120/v2/https://flxt.tmsimg.com/assets/249381_v9_bb.jpg",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Casts", null, {});
	}
};
