const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const fileUploader = require("../config/cloudinary");

const Movie = require("../models/Movie.model");

const User = require("../models/User.model");

// All Movies Page
router.get("/", isLoggedIn, (req, res, next) => {
  if (req.session.user) {
    Movie.find({}).then((allMovies) => {
      res.render("movies", { allMovies });
    });
  }
});

// Single Movie Page
router.get("/:movieId", isLoggedIn, (req, res) => {
  Movie.findOne({ _id: req.params.movieId }).then((singleMovie) => {
    console.log(singleMovie._id);
    res.render("single-movie", { singleMovie });
  });
});

// Add to my list feature
// Added favouriteList in User.model
// Modified line 41 in single-movie.hbs (link add to my list)

router.get("/:movieId/addToMyList", isLoggedIn, (req, res) => {
  Movie.findOne({ _id: req.params.movieId }).then((singleMovie) => {
    User.findByIdAndUpdate(
      req.session.user._id,
      {
        $addToSet: { favouriteList: singleMovie },
      },
      { new: true }
    ).then((updatedUser) => {
      console.log("updatedUser:", updatedUser);
      return res.redirect(`/movies/${singleMovie._id}`);
    });
  });
})

module.exports = router;
