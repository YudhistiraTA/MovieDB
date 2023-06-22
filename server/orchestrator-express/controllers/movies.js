const axios = require("axios");
const redis = require("../config/redisConnection");
const MOVIE_URL = process.env.MOVIE_URL || "http://localhost:3000";
module.exports = class MovieController {
	static async fetchMovies(req, res, next) {
		try {
			const movie = await redis.get("movies");
			if (movie) {
				res.status(200).json(JSON.parse(movie));
				return;
			}
			const { data } = await axios.get(MOVIE_URL + "/movies");
			redis.set("movies", JSON.stringify(data));
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
	static async createMovie(req, res, next) {
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
			const { data: creationStatus } = await axios.post(
				MOVIE_URL + "/movies",
				{
					title,
					synopsis,
					trailerUrl,
					imgUrl,
					rating,
					GenreId,
					Casts
				}
			);
			redis.del("movies");
			res.status(201).json(creationStatus);
		} catch (error) {
			next(error);
		}
	}
	static async deleteMovie(req, res, next) {
		try {
			const { id } = req.params;
			const { data: deletionStatus } = await axios.delete(
				MOVIE_URL + "/movies/" + id
			);
			redis.del("movies");
			res.status(200).json(deletionStatus);
		} catch (error) {
			next(error.response);
		}
	}
};
