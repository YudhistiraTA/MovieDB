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
    input CastInput {
        name: String
        profilePict: String
    }
    input MovieInput {
        title: String
		synopsis: String
		trailerUrl: String
		imgUrl: String
		rating: Int
		GenreId: Int
		Casts: [CastInput]
    }
    type MoviesOrError {
        movies: [Movie]
        Error: Error
    }
    type SuccessOrError {
		Error: Error
		message: String
	}
    type Mutation {
        createMovie(input: UserInput!): SuccessOrError
		deleteMovie(id: Int!): SuccessOrError
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
				const { data: movie } = await axios.get(
					MOVIE_URL + "/movies/" + id
				);
				return movie;
			} catch (error) {
				return { Error: error.response.data };
			}
		}
	},
	Mutation: {
		createMovie: async (_, { input }) => {
			try {
				const { data: movie } = await axios.post(
					`${USER_URL}/movies`,
					input
				);
				console.log(movie);
				return movie;
			} catch (error) {
				console.log(error);
				return { Error: error.response.data };
			}
		},
		deleteMovie: async (_, { id }) => {
			try {
				const { data: deleteStatus } = await axios.delete(
					`${MOVIE_URL}/movies/${id}`
				);
				console.log(deleteStatus);
				return deleteStatus;
			} catch (error) {
				console.log(error.response.data);
				return { Error: error.response.data };
			}
		}
	}
};

module.exports = {
	typeDefs,
	resolvers
};
