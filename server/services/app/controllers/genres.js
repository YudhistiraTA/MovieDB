const { User, Genre, Movie, Cast, sequelize } = require("../models");

module.exports = class GenreController {
	static async createGenre(req, res, next) {
		try {
			const { name } = req.body;
			const newGenre = await Genre.create({
				name
			});
			res.status(201).json({
				message: "Genre created!",
				newGenre
			});
		} catch (error) {
			next(error);
		}
	}
	static async fetchGenre(req, res, next) {
		try {
			const { id } = req.params;
			let data;
			if (id) data = await Genre.findByPk(id);
			else
				data = await Genre.findAll({
					order: [["id", "ASC"]]
				});
			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	}
	static async updateGenre(req, res, next) {
		try {
			const { name } = req.body;
			const { id } = req.params;
			const updatedData = await Genre.update({ name }, { where: { id } });
			if (!updatedData[0]) throw { name: "notFound" };
			res.status(200).send(updatedData);
		} catch (error) {
			next(error);
		}
	}
	static async deleteGenre(req, res, next) {
		try {
			const { id } = req.params;
			const deletionStatus = await Genre.destroy({ where: { id } });
			res.status(200).send({ message: "Deletion successful" });
		} catch (error) {
			next(error);
		}
	}
};
