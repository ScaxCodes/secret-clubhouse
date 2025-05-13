const { check, validationResult } = require("express-validator");

const validatePostMessage = [
  check("title")
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage("Title is required and should be less than 51 characters"),
  check("body")
    .notEmpty()
    .isLength({ max: 800 })
    .withMessage(
      "Message body is required and should be less than 501 characters"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validatePostMessage;
