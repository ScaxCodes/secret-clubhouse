const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", userController.addUser);

module.exports = router;
