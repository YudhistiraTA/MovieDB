const axios = require("axios");
const redis = require("../config/redisConnection");
const MOVIE_URL = process.env.MOVIE_URL || "http://localhost:3000";
module.exports = class MovieController {
	static async fetchMovies(req, res, next) {
		try {
			const movie = await redis.get("movies");
			if (movie) {
				res.status(200).send(JSON.parse(movie));
				return;
			}
			const response = await axios.get(MOVIE_URL + "/movies");
			redis.set("movies", JSON.stringify(response.data));
			res.status(200).send(response.data);
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
			const { data:creationStatus} = await axios.post(MOVIE_URL + "/movies", {
				title,
				synopsis,
				trailerUrl,
				imgUrl,
				rating,
				GenreId,
				Casts
			});
			console.log(creationStatus);
			res.status(201).json(creationStatus);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
};
