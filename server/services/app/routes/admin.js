const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genres");
const MovieController = require("../controllers/movies");

router.post("/genres", GenreController.createGenre);
router.get("/genres", GenreController.fetchGenre);
router.put("/genres/:id", GenreController.updateGenre);
router.get("/genres/:id", GenreController.fetchGenre);
router.delete("/genres/:id", GenreController.deleteGenre);
router.get("/movies", MovieController.fetchMovies);
router.post("/movies", MovieController.createMovie);
router.delete("/movies/:id", MovieController.deleteMovie);
router.get("/movies/:id", MovieController.fetchMovies);
router.put("/movies/:id", MovieController.updateMovie);
module.exports = router;
