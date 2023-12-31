const { Genre, Movie, Cast, sequelize } = require("../models");

module.exports = class MovieController {
	static async createMovie(req, res, next) {
		const trx = await sequelize.transaction();
		try {
			let {
				title,
				synopsis,
				trailerUrl,
				imgUrl,
				rating,
				GenreId,
				Casts
			} = req.body;
			// const { id: AuthorId } = req.additionalData;
			const AuthorId = "64931654b379120600a7793c";
			const newMovie = await Movie.create(
				{
					title,
					synopsis,
					trailerUrl,
					imgUrl,
					rating,
					GenreId,
					AuthorId
				},
				{
					transaction: trx
				}
			);
			Casts = Casts.map((Cast) => {
				Cast.MovieId = newMovie.id;
				return Cast;
			});
			const newCasts = await Cast.bulkCreate(Casts, {
				transaction: trx
			});
			trx.commit();
			res.status(201).json({
				message: "Movie created!",
				newMovie
			});
		} catch (error) {
			trx.rollback();
			next(error);
		}
	}
	static async fetchMovies(req, res, next) {
		try {
			const { id, slug } = req.params;
			let data;
			if (id) {
				data = await Movie.findByPk(id, {
					include: [
						{
							model: Cast,
							attributes: {
								exclude: ["createdAt", "updatedAt", "MovieId"]
							}
						},
						{
							model: Genre,
							attributes: {
								exclude: ["createdAt", "updatedAt"]
							}
						}
					],
					attributes: {
						exclude: ["createdAt", "updatedAt", "GenreId"]
					}
				});
				if (!data) throw { name: "notFound" };
			} else if (slug) {
				data = await Movie.findOne({
					where: { slug },
					include: [
						{
							model: Cast,
							attributes: {
								exclude: ["createdAt", "updatedAt", "MovieId"]
							}
						},
						{
							model: Genre,
							attributes: {
								exclude: ["createdAt", "updatedAt"]
							}
						}
					],
					attributes: {
						exclude: ["createdAt", "updatedAt", "GenreId"]
					}
				});
				if (!data) throw { name: "notFound" };
			} else {
				data = await Movie.findAll({
					include: [
						{
							model: Cast,
							attributes: {
								exclude: ["createdAt", "updatedAt", "MovieId"]
							}
						},
						{
							model: Genre,
							attributes: {
								exclude: ["createdAt", "updatedAt"]
							}
						}
					],
					order: [["id", "ASC"]],
					attributes: {
						exclude: ["createdAt", "updatedAt", "GenreId"]
					}
				});
				if (!data) throw { name: "notFound" };
			}
			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	}
	static async deleteMovie(req, res, next) {
		try {
			const { id } = req.params;
			const deletionStatus = await Movie.destroy({ where: { id } });
			if (!deletionStatus) throw { name: "notFound" };
			res.status(200).send({ message: "Deletion successful" });
		} catch (error) {
			next(error);
		}
	}
	static async updateMovie(req, res, next) {
		const trx = await sequelize.transaction();
		try {
			let {
				title,
				synopsis,
				trailerUrl,
				imgUrl,
				rating,
				GenreId,
				Casts
			} = req.body;
			const { id } = req.params;
			const foundData = await Movie.findByPk(id);
			if (!foundData) throw { name: "notFound", message: "Not found" };
			const updatedData = await Movie.update(
				{
					title,
					synopsis,
					trailerUrl,
					imgUrl,
					rating,
					GenreId
				},
				{ where: { id }, individualHooks: true },
				{ transaction: trx }
			);
			await Cast.destroy(
				{ where: { MovieId: id } },
				{ transaction: trx }
			);
			Casts = Casts.map((Cast) => {
				Cast.MovieId = id;
				return Cast;
			});
			const newCasts = await Cast.bulkCreate(Casts, {
				transaction: trx
			});
			trx.commit();
			if (!updatedData[0]) throw { name: "notFound" };
			res.status(200).send({ message: "Edited successfully!" });
		} catch (error) {
			next(error);
		}
	}
};
