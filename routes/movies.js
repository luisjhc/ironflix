const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const fileUploader = require("../config/cloudinary");

const Movie = require("../models/Movie.model");

router.get("/", isLoggedIn, (req, res, next) => {
  if (req.session.user) {
    res.render("movies");
  }
});

module.exports = router;
