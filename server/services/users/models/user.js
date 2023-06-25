const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const bcrypt = require("bcrypt");

class User {
	static getCollections() {
		const db = getDatabase();
		const users = db.collection("Users");
		return users;
	}

	static async findAll() {
		return this.getCollections()
			.find({}, { projection: { password: 0 } })
			.toArray();
	}

	static async createUser(user) {
		try {
			const requiredFields = ["email", "password", "username"];
			for (let key of requiredFields) {
				if (!user[key])
					throw {
						name: "validationError",
						message: key + " is required"
					};
			}
			const foundUser = await User.findByEmail(user.email);
			if (foundUser)
				throw {
					name: "uniqueEmail",
					message: "Email is already in use"
				};
			user.password = bcrypt.hashSync(user.password, 10);
			return this.getCollections().insertOne(user);
		} catch (error) {
			throw error;
		}
	}

	static async findById(objectId) {
		return this.getCollections().findOne(
			{
				_id: new ObjectId(objectId)
			},
			{ projection: { password: 0 } }
		);
	}

	static async findByEmail(email) {
		return this.getCollections().findOne(
			{
				email
			},
			{ projection: { password: 0 } }
		);
	}

	static async deleteUserById(objectId) {
		return this.getCollections().deleteOne({
			_id: new ObjectId(objectId)
		});
	}
}

module.exports = User;
