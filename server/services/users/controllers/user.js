const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
	findAllUsers: async (req, res, next) => {
		const data = await User.findAll();
		res.status(200).json({
			statusCode: 200,
			data
		});
	},
	createUser: async (req, res, next) => {
		const { username, email, password, phoneNumber, address } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = await User.createUser({
			username,
			email,
			password: hashedPassword,
			phoneNumber,
			address
		});

		res.status(201).json({
			statusCode: 201,
			id: newUser.insertedId,
			email
		});
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
			console.log({ name: error.name, messsage: error.message });
			next({ name: error.name, message: error.message });
		}
	},
	deleteUserById: async (req, res, next) => {
		const { id } = req.params;
		const deleteStatus = await User.deleteUserById(id);
		res.status(200).json({
			statusCode: 200,
			deleteStatus
		});
	}
};
