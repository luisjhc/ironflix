const router = require("express").Router();
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
/* GET home page */
router.get("/", shouldNotBeLoggedIn, (req, res, next) => {
  res.render("homePage");
});

module.exports = router;
