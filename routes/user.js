const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  // Render sign up form
  .get(userController.renderSignupForm)
  // Sign Up route
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  // Render Login Form
  .get(userController.renderLoginForm)
  // login
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );


// logout
router.get("/logout", userController.logout);

module.exports = router;
