const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require ("../models/User.model");
const fileUploader = require('../config/cloudinary');

router.get("/", isLoggedIn, (req, res) => {
  res.render("profile", {user: req.session.user});
});

router.get("/edit", isLoggedIn, (req, res) => {
  res.render("edit-profile", {user: req.session.user});
});

router.post("/edit", isLoggedIn, (req, res) => {
  const {username, bio, email} = req.body;
  const body = {username, shortBio: bio, email}
  for (let key in body) {
    if(body[key] === null || body[key] === undefined || body[key] === "") {
      delete body[key];
    }
  }
  User.findByIdAndUpdate(
    req.session.user._id, 
    body,
    {new: true}
  ).then((newUser) => {
    req.session.user = newUser;
    res.redirect("/profile");
  });
});

router.get("/dark-mode", isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    req.session.user._id,
    {
      prefersDarkMode: !req.session.user.prefersDarkMode,
    },
    { new: true }
  ).then((updatedUser) => {
    console.log("updatedUser:", updatedUser);
    req.session.user = updatedUser;
    res.redirect("/profile");
  });
});

router.get("/movies", isLoggedIn, (req, res) => {
  res.render("movies", {user: req.session.user});
});

module.exports = router;