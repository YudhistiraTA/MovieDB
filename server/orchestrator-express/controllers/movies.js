const axios = require("axios");
const redis = require("../config/redisConnection");
const MOVIE_URL = process.env.MOVIE_URL || "http://localhost:3000";
module.exports = class MovieController {
	static async fetchMovies(req, res, next) {
		try {
			const { data } = await axios.get(MOVIE_URL + "/movies");
			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	}
};
