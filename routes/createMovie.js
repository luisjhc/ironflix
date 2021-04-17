const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const fileUploader = require("../config/cloudinary");

const Movie = require("../models/Movie.model");

const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  res.render("createMovie");
});

router.post("/", fileUploader.single("coverPic"), isLoggedIn, (req, res) => {
  const {
    title,
    director,
    stars,
    dateOfRelease,
    coverPic,
    owner,
    description,
    didYouKnow,
    trailerLink,
  } = req.body;
  Movie.findOne({ title }).then((found) => {
    if (found) {
      return res.render("createMovie", {
        errorMessage: "This movie is already in our collection",
      });
    }
    return Movie.create({
      title,
      director,
      stars,
      dateOfRelease,
      coverPic: req.file.path,
      owner: req.session.user._id,
      description,
      didYouKnow,
      trailerLink,
    }).then(() => {
      res.redirect("/movies");
    });
  });
});

module.exports = router;
