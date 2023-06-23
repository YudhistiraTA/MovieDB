const express = require("express");
const MovieController = require("../controllers/movies");
const UserController = require("../controllers/users");
const router = express.Router();

router.get("/movies", MovieController.fetchMovies);
router.post("/movies", MovieController.createMovie);
router.delete("/movies/:id", MovieController.deleteMovie);
router.put("/movies/:id", MovieController.editMovie);
router.get("/movies/:id", MovieController.fetchMovieDetail);

router.get("/users/", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.post("/users/", UserController.createUser);
router.delete("/users/:id", UserController.deleteUserById);
module.exports = router;
