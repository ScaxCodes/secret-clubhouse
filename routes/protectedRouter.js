const { Router } = require("express");
const userController = require("../controllers/userController");
const protectedRouter = Router();
const ensureAuthenticated = require("../auth/auth-middleware");

protectedRouter.get("/join-the-club", ensureAuthenticated, (req, res) => {
  res.render("join-the-club", { error: null });
});

protectedRouter.post(
  "/join-the-club",
  ensureAuthenticated,
  userController.setClubmember
);

module.exports = protectedRouter;
