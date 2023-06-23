require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const router = require("./routes");
const errorHandling = require("./middlewares/errorHandling.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandling);
app.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
