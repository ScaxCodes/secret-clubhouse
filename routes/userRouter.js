const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.render("index");
});

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});
userRouter.post("/signup", userController.addUser);

module.exports = userRouter;
