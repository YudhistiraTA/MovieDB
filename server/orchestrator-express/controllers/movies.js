const axios = require("axios");
const redis = require("../config/redisConnection");
const MOVIE_URL = process.env.MOVIE_URL || "http://localhost:3000";
const USER_URL = process.env.USER_URL || "http://localhost:3001";
module.exports = class MovieController {
	static async fetchMovies(req, res, next) {
		try {
			const movie = await redis.get("movies");
			if (movie) {
				res.status(200).json(JSON.parse(movie));
				return;
			}
			let { data: moviesRest } = await axios.get(MOVIE_URL + "/movies");
			const movieWithAuthorPromises = moviesRest.map(async (movie) => {
				const { data } = await axios.get(
					USER_URL + "/users/" + movie.AuthorId
				);
				movie.Author = data.data;
				delete movie.AuthorId;
				return movie;
			});
			const movieWithAuthor = await Promise.all(movieWithAuthorPromises);
			redis.set("movies", JSON.stringify(movieWithAuthor));
			res.status(200).json(movieWithAuthor);
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
