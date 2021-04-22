const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const fileUploader = require("../config/cloudinary");

const Movie = require("../models/Movie.model");

const User = require("../models/User.model");
const { text } = require("express");

// All Movies Page
// router.get("/", isLoggedIn, (req, res, next) => {
//   if (req.session.user) {
//     Movie.find({}).then((allMovies) => {
//       res.render("movies", { allMovies });
//     });
//   }
// });
router.get("/", isLoggedIn, (req, res, next) => {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Movie.find({ title: regex }).then((searchedMovie) => {
      res.render("movies", { searchedMovie });
      //console.log(searchedMovie);
    });
  } else {
    Movie.find({}).then((allMovies) => {
      res.render("movies", { allMovies });
    });
  }
});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Single Movie Page

router.get("/:movieId", isLoggedIn, (req, res) => {
  Movie.findOne({ _id: req.params.movieId })
    .populate("owner")
    .then((singleMovie) => {
      //console.log(singleMovie);
      if (!singleMovie) {
        return res.redirect("/movies");
      }

      // To check if the movie is in My List

      let isInFavouriteList;
      if (req.session.user.favouriteList.includes(singleMovie._id.toString())) {
        isInFavouriteList = true;
      }

      // To check if the user is who uploaded the movie, so he can delete it

      let isOwner = false;

      if (singleMovie?.owner?._id?.toString() === req.session.user._id) {
        isOwner = true;
      }

      // Ratings

      const sum = singleMovie.ratings.reduce((acc, val) => {
        return acc + val;
      }, 0);

      // sum ? -> checks if sum is not 0

      let rating = sum ? sum / singleMovie.ratings.length : 0;
      rating = Math.round(rating * 10) / 10;

      res.render("single-movie", {
        singleMovie,
        isInFavouriteList,
        isOwner,
        rating,
      });
    });
});

// Add to my list feature

router.get("/:movieId/addToMyList", isLoggedIn, (req, res) => {
  Movie.findOne({ _id: req.params.movieId }).then((singleMovie) => {
    User.findByIdAndUpdate(
      req.session.user._id,
      {
        $addToSet: { favouriteList: singleMovie },
      },
      { new: true }
    ).then((updatedUser) => {
      // console.log("updatedUser:", updatedUser);
      req.session.user = updatedUser;
      return res.redirect(`/movies/${singleMovie._id}`);
    });
  });
});

// Delete from list

router.get("/:movieId/deleteFromList", isLoggedIn, (req, res) => {
  Movie.findOne({ _id: req.params.movieId }).then((singleMovie) => {
    User.findByIdAndUpdate(
      req.session.user._id,
      {
        $pull: { favouriteList: singleMovie._id },
      },
      { new: true }
    ).then((updatedUser) => {
      // console.log("updatedUser:", updatedUser);
      req.session.user = updatedUser;
      return res.redirect(`/movies/${singleMovie._id}`);
    });
  });
});

//Remove movie from collection

router.get("/:movieId/deleteFromCollection", isLoggedIn, (req, res) => {
  Movie.findById(req.params.movieId).then((movieFound) => {
    if (!movieFound) {
      return res.redirect("/");
    }

    Movie.findByIdAndDelete(movieFound._id).then(() => {
      return res.redirect("/");
    });
    // Movie = updatedCollection;
  });
});

// Route for Ratings POST request:
function movieExists(req, res, next) {
  Movie.findById(req.params.movieId).then((movieFound) => {
    if (!movieFound) {
      return res.redirect("/");
    }
    req.movie = movieFound;
    next();
  });
}

router.post("/:movieId/rating", isLoggedIn, movieExists, (req, res) => {
  const rating = +req.body.rating;
  if (!rating) {
    return res.redirect("/");
  }
  if (rating > 5 || rating < 1) {
    return res.redirect("/");
  }

  Movie.findByIdAndUpdate(
    req.movie._id,
    {
      $push: { ratings: rating },
    },
    { new: true }
  ).then((updatedRating) => {
    //console.log(updatedRating);
    res.redirect(`/movies/${req.movie._id}`);
  });
});

module.exports = router;
