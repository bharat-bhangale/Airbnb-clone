const User = require("../models/user");



// Render Sign up form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Sign Up route
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Render Login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to WanderLust! You are all set to go...");
  let redirectUrl = res.locals.redirectUrl || "/listings";

  res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are successfully logged out now!");
    res.redirect("/listings");
  });
};
