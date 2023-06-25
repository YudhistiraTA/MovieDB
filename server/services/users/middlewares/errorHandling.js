module.exports = (err, req, res, next) => {
	switch (err.name) {
		case "BSONError":
			console.log(err.name, err.message);
			res.status(400).json({
				name: err.name + ":idLength",
				message: err.message
			});
			break;
		case "invalidLogin":
			res.status(401).json({ message: "Invalid email or password" });
			break;
		case "validationError":
			res.status(400).json({ name: err.name, message: err.message });
			break;
		case "uniqueEmail":
			res.status(400).json({ name: err.name, message: err.message });
			break;
		case "invalidToken":
		case "JsonWebTokenError":
			res.status(401).json({ message: "Invalid Token" });
			break;
		case "TokenExpiredError":
			res.status(401).json({ message: "Token expired" });
			break;
		case "forbidden":
			res.status(403).json({ message: "Forbidden" });
			break;
		case "notFound":
			res.status(404).json({ message: "Not found" });
			break;
		case "SequelizeUniqueConstraintError":
			res.status(409).json({
				message: ["Email is already in use"]
			});
			break;
		case "SequelizeForeignKeyConstraintError":
			res.status(409).json({
				message: "This item is not available/still in use!"
			});
			break;
		default:
			res.status(500).json({ message: "Internal server error" });
			break;
	}
};
