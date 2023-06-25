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
        Error: Error
	}
    type MoviesOrError {
        movies: [Movie]
        Error: Error
    }
    type Query {
		movies: MoviesOrError,
        movie(id: Int!): Movie
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
		},
		movie: async (_, { id }) => {
			try {
                const { data: movie } = await axios.get(MOVIE_URL + "/movies/" + id);
				return movie;
			} catch (error) {
				return { Error: error.response.data };
			}
		}
	}
};

module.exports = {
	typeDefs,
	resolvers
};
