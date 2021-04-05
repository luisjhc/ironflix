const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require ("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  res.render("profile", {user: req.session.user});
});

router.get("/edit", isLoggedIn, (req, res) => {
  res.render("edit-profile", {user: req.session.user});
});

router.post("/edit", isLoggedIn, (req, res) => {
  const {username, bio, email} = req.body;

  User.findByIdAndUpdate(
    req.session.user._id, 
    {username, shortBio: bio, email},
    {new: true}
  ).then((newUser) => {
    req.session.user = newUser;
    res.redirect("/profile");
  });
});

module.exports = router;