// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

const projectName = "ironflix";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

// 👇 Start handling routes here
// Home Page Route
const homePage = require("./routes/homePage");
app.use("/", homePage);

// Auth Route (login/signup)
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Profile Route
const profileRoutes = require("./routes/profile");
app.use("/profile", profileRoutes);

// Edit Profile Pic Route
const editProfilePicRoutes = require("./routes/editProfilePic");
app.use("/editProfilePic", editProfilePicRoutes);

// All Movies Route
const moviesRoutes = require("./routes/movies");
app.use("/movies", moviesRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
