const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
	typeDefs: userTypeDefs,
	resolvers: userResolvers
} = require("./schemas/user");
const {
	typeDefs: MovieTypeDefs,
	resolvers: MovieResolvers
} = require("./schemas/movie");

(async () => {
	const server = new ApolloServer({
		typeDefs: [userTypeDefs, MovieTypeDefs],
		resolvers: [userResolvers, MovieResolvers],
		introspection: true,
		formatError: (err) => {
			const errorDetails = JSON.parse(err.message);
			return new ApolloError(errorDetails.message, errorDetails.name);
		}
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: process.env.PORT || 4000 }
	});

	console.log(`🚀  Server ready at: ${url}`);
})();
