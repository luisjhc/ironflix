const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const fileUploader = require("../config/cloudinary");

const Movie = require("../models/Movie.model");

// All Movies Page
router.get("/", isLoggedIn, (req, res, next) => {
  console.log("I WAS CALLED");
  if (req.session.user) {
    Movie.find({}).then((allMovies) => {
      res.render("movies", { allMovies });
    });
  }
});

// Single Movie Page
router.get("/:movieId", (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  }
  Movie.findOne({ _id: req.params.movieId }).then((singleMovie) => {
    res.render("single-movie", { singleMovie });
  });
});

module.exports = router;
