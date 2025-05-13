const { check, validationResult } = require("express-validator");

const validateSignup = [
  check("username").notEmpty().withMessage("Username is required"),
  check("firstname").notEmpty().withMessage("First Name is required"),
  check("lastname").notEmpty().withMessage("Last Name is required"),
  check("password").notEmpty().withMessage("Password is required"),

  check("confirmPassword")
    .exists()
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
