module.exports = (err, req, res, next) => {
	switch (err.name) {
		case "notFound":
			res.status(404).json({
				message: "Not found"
			});
			break;
		case "SequelizeForeignKeyConstraintError":
			res.status(409).json({
				message: err.message
			});
			break;
		case "BSONError:idLength":
			res.status(401).json({
				message: err.message
			});
			break;
		case "SequelizeValidationError":
			res.status(401).json({
				message: err.message
			});
			break;
		default:
			res.status(500).json({
				message: "Error 500: Internal server error"
			});
			break;
	}
};
