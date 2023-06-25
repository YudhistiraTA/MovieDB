const axios = require("axios");
const redis = require("../config/redisConnection");
const MOVIE_URL = process.env.MOVIE_URL || "http://localhost:3000";
const USER_URL = process.env.USER_URL || "http://localhost:3001";

module.exports = class UserController {
	static async findAllUsers(req, res, next) {
		try {
			const usersCache = await redis.get("users");
			if (usersCache) {
				res.status(200).json(JSON.parse(usersCache));
				return;
			}
			const { data: users } = await axios.get(USER_URL + "/users");
			redis.set("users", JSON.stringify(users.data));
			res.status(200).json(users.data);
		} catch (error) {
			next(error.response.data);
		}
	}
	static async findUserById(req, res, next) {
		try {
			const { id } = req.params;
			const userCache = await redis.get(`user:${id}`);
			if (userCache) {
				res.status(200).json(JSON.parse(userCache));
				return;
			}
			const { data: user } = await axios.get(USER_URL + "/users/" + id);
			if (!user.data) throw { name: "notFound" };
			console.log(user.data);
			redis.set(`user:${id}`, JSON.stringify(user.data));
			res.status(200).json(user.data);
		} catch (error) {
			next(error.response.data);
		}
	}
	static async createUser(req, res, next) {
		try {
			const { username, email, password, phoneNumber, address } =
				req.body;
			const { data: createStatus } = await axios.post(
				USER_URL + "/users",
				{
					username,
					email,
					password,
					phoneNumber,
					address
				}
			);
			res.status(201).json(createStatus);
		} catch (error) {
			console.log(error);
			next(error.response.data);
		}
	}
	static async deleteUserById(req, res, next) {
		try {
			const { id } = req.params;
			const { data: deleteStatus } = await axios.delete(
				USER_URL + "/users/" + id
			);
			res.status(200).send(deleteStatus);
		} catch (error) {
			next(error.response.data);
		}
	}
};
