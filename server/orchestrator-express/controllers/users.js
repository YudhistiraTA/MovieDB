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
            const { data:users } = await axios.get(USER_URL + "/users");
            redis.set("users", JSON.stringify(users.data));
			res.status(200).json(users.data);
		} catch (error) {
			next(error);
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
            const { data:user } = await axios.get(USER_URL + "/users/" + id);
            redis.set(`user:${id}`, JSON.stringify(user.data));
			res.status(200).json(user.data);
			res.status(501).send("under construction");
		} catch (error) {
			next(error);
		}
	}
	static async createUser(req, res, next) {
		try {
			res.status(501).send("under construction");
		} catch (error) {
			next(error);
		}
	}
	static async deleteUserById(req, res, next) {
		try {
			res.status(501).send("under construction");
		} catch (error) {
			next(error);
		}
	}
};
