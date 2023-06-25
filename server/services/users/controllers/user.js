const User = require("../models/user");

module.exports = {
	findAllUsers: async (req, res, next) => {
		const data = await User.findAll();
		res.status(200).json({
			statusCode: 200,
			data
		});
	},
	createUser: async (req, res, next) => {
		try {
			const { username, email, password, phoneNumber, address } =
				req.body;
			const newUser = await User.createUser({
				username,
				email,
				password,
				phoneNumber,
				address
			});
			res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	},
	findUserById: async (req, res, next) => {
		try {
			const { id } = req.params;
			const foundUser = await User.findById(id);
			res.status(200).json({
				statusCode: 200,
				data: foundUser
			});
		} catch (error) {
			next({ name: error.name, message: error.message });
		}
	},
	deleteUserById: async (req, res, next) => {
		try {
			const { id } = req.params;
			const deleteStatus = await User.deleteUserById(id);
			if (!deleteStatus.deletedCount) throw { name: "notFound" };
			res.status(200).json({
				statusCode: 200,
				deleteStatus
			});
		} catch (error) {
			console.log({ name: error.name, messsage: error.message });
			next(error);
		}
	}
};
