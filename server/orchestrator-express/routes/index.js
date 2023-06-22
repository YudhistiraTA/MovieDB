const express = require("express");
const MovieController = require("../controllers/movies");
const router = express.Router();

router.get("/movies", MovieController.fetchMovies);
router.post("/movies", MovieController.createMovie);
module.exports = router;
