const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const fileUploader = require("../config/cloudinary");

const Movie = require("../models/Movie.model");

const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  res.render("createMovie");
});

module.exports = router;
