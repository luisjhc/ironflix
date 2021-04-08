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

module.exports = router;
