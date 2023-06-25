const axios = require("axios");
const MOVIE_URL = process.env.MOVIE_URL || "http://127.0.0.1:4002";

const typeDefs = `#graphql
	type Error {
		name: String
		message: String
	}
    type Cast {
        id: Int
        name: String
        profilePict: String
    }
    type Genre {
        id: Int
        name: String
    }
	type Movie {
        id: Int
		title: String
		synopsis: String
		trailerUrl: String
		imgUrl: String
		rating: String
		Casts: [Cast]
        Genre: Genre
	}
    type MoviesOrError {
        movies: [Movie]
        Error: Error
    }
    type Query {
		movies: MoviesOrError,
	}
`;

const resolvers = {
	Query: {
		movies: async () => {
			try {
				const { data: movies } = await axios.get(MOVIE_URL + "/movies");
				return { movies };
			} catch (error) {
				console.log(error);
				return { Error: error.response.data };
			}
		}
	}
};

module.exports = {
	typeDefs,
	resolvers
};
