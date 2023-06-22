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
			const { data } = await axios.get(MOVIE_URL + "/movies");
			redis.set("movies", JSON.stringify(data));
			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	}
};