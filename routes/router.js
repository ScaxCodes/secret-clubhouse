const { Router } = require("express");
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
const signupValidator = require("../controllers/signupValidator");
const router = Router();
const passport = require("passport");

router.get("/", messageController.loadMessages, (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup", { errors: [], formData: {} });
});
router.post("/signup", signupValidator, userController.addUser);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
