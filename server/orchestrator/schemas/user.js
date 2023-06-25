const axios = require("axios");
const USER_URL = process.env.USER_URL || "http://127.0.0.1:4001";

const typeDefs = `#graphql
	type Error {
		name: String
		message: String
	}
	type User {
		_id: String
		username: String
		email: String
		role: String
		phoneNumber: String
		address: String
		Error: Error
	}
	type UsersOrError {
		users: [User]
		Error: Error
	}
	type Query {
		users: UsersOrError,
        user(_id: String!): User
	}
`;

const resolvers = {
	Query: {
		users: async () => {
			try {
				const { data: users } = await axios.get(`${USER_URL}/users`);
				return {users: users.data};
			} catch (error) {
				return {Error: error.response.data};
			}
		},
		user: async (_, { _id }) => {
			try {
				const { data: user } = await axios.get(
					`${USER_URL}/users/${_id}`
				);
				return user.data;
			} catch (error) {
				console.log(error.response.data);
				return {Error: error.response.data};
			}
		}
	}
};

module.exports = {
	typeDefs,
	resolvers
};
