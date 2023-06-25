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
		await queryInterface.bulkInsert("Movies", [
			{
				title: "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
				slug: "spider-man-across-the-spider-verse",
				synopsis:
					"Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, an epic adventure that will transport Brooklyn's full-time, friendly neighborhood Spider-Man across the Multiverse to join forces with Gwen Stacy and a new team of Spider-People to face off with a villain more powerful than anything they have ever encountered.",
				trailerUrl: "https://youtu.be/shW9i6k8cB0",
				imgUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg",
				rating: 96,
				GenreId: 1,
				AuthorId: "placeholder",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				title: "GUARDIANS OF THE GALAXY VOL. 3",
				slug: "guardians-of-the-galaxy-vol-3",
				synopsis:
					'In Marvel Studios "Guardians of the Galaxy Vol. 3" our beloved band of misfits are looking a bit different these days. Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.',
				trailerUrl: "https://youtu.be/u3V5KDHRQvk",
				imgUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/Guardians_of_the_Galaxy_Vol._3_poster.jpg",
				rating: 82,
				GenreId: 2,
				AuthorId: "placeholder",
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
		await queryInterface.bulkDelete("Movies", null, {});
	}
};
