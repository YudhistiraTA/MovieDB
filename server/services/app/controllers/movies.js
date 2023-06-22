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
			const { id: AuthorId } = req.additionalData;
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
			if (id)
				data = await Movie.findByPk(id, {
					include: [{ model: Cast }, { model: Genre }],
					attributes: { exclude: ["createdAt", "updatedAt"] }
				});
			else if (slug)
				data = await Movie.findOne(
					{
						where: { slug },
						include: [{ model: Cast }, { model: Genre }],
						attributes: { exclude: ["createdAt", "updatedAt"] }
					},
				);
			else
				data = await Movie.findAll({
					include: [
						{ model: Genre },
					],
					order: [["id", "ASC"]]
				});
			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	}
	static async deleteMovie(req, res, next) {
		try {
			const { id } = req.params;
			const deletionStatus = await Movie.destroy({ where: { id } });
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
			const updatedData = await Movie.update(
				{
					title,
					synopsis,
					trailerUrl,
					imgUrl,
					rating,
					GenreId
				},
				{ where: { id } },
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
			res.status(200).send(updatedData);
		} catch (error) {
			next(error);
		}
	}
};
