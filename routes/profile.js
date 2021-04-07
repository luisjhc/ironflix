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

router.post("/edit", fileUploader.single('profilePic'), isLoggedIn, (req, res) => {
  const {username, bio, email} = req.body;
  const body = {username, shortBio: bio, email, profilePic: req.file.path}
  for (let key in body) {
    if(body[key] === null || body[key] === undefined || body[key] === "") {
      delete body[key];
    }
  }
 // you need to turn req.body into a new object, that doesnt hold empty values.
 /* 
 {
   username:"",
   bio:"important stuff",
   email:"y@y.com"
 },
 {
  bio:"important stuff",
   email:"y@y.com"
 }

 ¨
 {
   username: "¨snoopy",
   email:"ëmail@email.com",
   bio:""
 }

 {
    username: "¨snoopy",
   email:"ëmail@email.com",
 }

 body.profilePic = req.file.path
 */ 

  User.findByIdAndUpdate(
    req.session.user._id, 
    body,
    //{username, shortBio: bio, email, profilePic: req.file.path},
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

module.exports = router;