const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require ("../models/User.model");
const fileUploader = require('../config/cloudinary');

router.get("/", isLoggedIn, (req, res) => {
  res.render("editProfilePic", {user: req.session.user});
});

router.post("/", fileUploader.single('profilePic'), isLoggedIn, (req, res) => {
  // const {profilePic} = req.body;
  // const body = {profilePic: req.file.path}

  User.findByIdAndUpdate(
    req.session.user._id, 
    {profilePic: req.file.path},
    {new: true}
  ).then((newUser) => {
    req.session.user = newUser;
    res.redirect("/editProfilePic");
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.redirect("/profile", {user: req.session.user});
});

router.get("/movies", isLoggedIn, (req, res) => {
  res.redirect("/movies", {user: req.session.user});
});

module.exports = router;