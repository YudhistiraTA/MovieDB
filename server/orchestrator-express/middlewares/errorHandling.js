module.exports = (err, req, res, next) => {
	switch (err.status) {
		case 404:
			res.status(404).json({
				message: err.data.message.join(", ")
			});
			break;
		default:
			res.status(500).json({
				message: "Error 500: Internal server error"
			});
			break;
	}
};
