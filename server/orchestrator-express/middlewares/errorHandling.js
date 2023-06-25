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
		case "SequelizeValidationError":
		case "validationError":
		case "uniqueEmail":
			res.status(400).json({
				message: err.message
			});
			break;
		default:
			console.log(err);
			res.status(500).json({
				message: "Error 500: Internal server error"
			});
			break;
	}
};
