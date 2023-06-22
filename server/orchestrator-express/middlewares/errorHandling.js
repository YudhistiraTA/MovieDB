module.exports = (err, req, res, next) => {
	switch (err.name) {
		case "notFound":
			res.status(404).json({
				message: "Error 404: Not Found"
			});
			break;
		default:
			res.status(500).json({
				message: "Error 500: Internal server error"
			});
			break;
	}
};
