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
    if (!singleMovie) {
      return res.redirect("/movies");
    }
    console.log(req.session.user);

    let isInFavouriteList;
    if (req.session.user.favouriteList.includes(singleMovie._id.toString())) {
      isInFavouriteList = true;
    }

    console.log("ÏS IN GFAVOROuier", isInFavouriteList);
    // console.log(singleMovie._id);
    res.render("single-movie", { singleMovie, isInFavouriteList });
  });
});

// Add to my list feature
// Added favouriteList in User.model
// Modified line 41 in single-movie.hbs (link add to my list)

router.get("/:movieId/addToMyList", isLoggedIn, (req, res) => {
  let isInFavouriteList;
  Movie.findOne({ _id: req.params.movieId }).then((singleMovie) => {
    User.findByIdAndUpdate(
      req.session.user._id,
      {
        $addToSet: { favouriteList: singleMovie },
      },
      { new: true }
    ).then((updatedUser) => {
      console.log("updatedUser:", updatedUser);
      req.session.user = updatedUser;
      return res.redirect(`/movies/${singleMovie._id}`);
    });
  });
});

module.exports = router;
