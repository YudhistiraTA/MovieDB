const axios = require("axios");
const USER_URL = process.env.USER_SERVICE_URL || "http://127.0.0.1:4001";

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
	input UserInput {
        username: String
        email: String
        password: String
        phoneNumber: String
        address: String
    }
	type SuccessOrError {
		acknowledged: Boolean
		insertedId: String
		deletedCount: Int
		Error: Error
	}
    type Mutation {
        createUser(input: UserInput!): SuccessOrError
		deleteUser(_id: String!): SuccessOrError
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
				return { users: users?.data };
			} catch (error) {
				return { Error: error.response.data };
			}
		},
		user: async (_, { _id }) => {
			try {
				const { data: user } = await axios.get(
					`${USER_URL}/users/${_id}`
				);
				return user?.data;
			} catch (error) {
				return { Error: error.response.data };
			}
		}
	},
	Mutation: {
		createUser: async (_, { input }) => {
			try {
				const { data: user } = await axios.post(
					`${USER_URL}/users`,
					input
				);
				return user;
			} catch (error) {
				return { Error: error.response.data };
			}
		},
		deleteUser: async (_, { _id }) => {
			try {
				const { data: deleteStatus } = await axios.delete(
					`${USER_URL}/users/${_id}`
				);
				return deleteStatus;
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
