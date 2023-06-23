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
			let { data: movieRest } = await axios.get(MOVIE_URL + "/movies");

			// SWITCH TO THIS TO ENABLE USER INCLUSION IN MOVIE fetchAll
			// const { data: userData } = await axios.get(USER_URL + "/users");
			// const movieWithAuthor = movieRest.map((movie) => {
			// 	movie.Author = userData.data.find(
			// 		(user) => user._id == movie.AuthorId
			// 	);
			// 	delete movie.AuthorId;
			// 	return movie;
			// });
			// redis.set("movies", JSON.stringify(movieWithAuthor));
			// res.status(200).json(movieWithAuthor);	

			redis.set("movies", JSON.stringify(movieRest));
			res.status(200).json(movieRest);
		} catch (error) {
			next(error.response);
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
			next(error.response);
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
	static async editMovie(req, res, next) {
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
			const { data: updateStatus } = await axios.put(
				MOVIE_URL + "/movies/" + id,
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
			redis.del(`movies:${id}`);
			res.status(200).json({
				message: "Edit successful"
			});
		} catch (error) {
			next(error.response);
		}
	}
	static async fetchMovieDetail(req, res, next) {
		try {
			const { id } = req.params;
			let {data:movie} = await axios.get(MOVIE_URL + "/movies/" + id);
			const {data:user} = await axios.get(USER_URL + "/users/" + movie.AuthorId);
			movie.Author = user.data;
			delete movie.AuthorId;
			res.status(200).json(movie);
		} catch (error) {
			next(error);
		}
	}
};
