const { body, validationResult } = require("express-validator");

const validateSignup = [
  body("username").notEmpty().withMessage("Username is required"),
  body("firstname").notEmpty().withMessage("First Name is required"),
  body("lastname").notEmpty().withMessage("Last Name is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup", {
        errors: errors.array(),
        formData: req.body,
      });
    }
    next();
  },
];

module.exports = validateSignup;
