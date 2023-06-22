const express = require("express");
const MovieController = require("../controllers/movies");
const router = express.Router();

router.get("/movies", MovieController.fetchMovies);
router.post("/movies", MovieController.createMovie);
router.delete("/movies/:id", MovieController.deleteMovie);
router.put("/movies/:id", MovieController.editMovie);
module.exports = router;
