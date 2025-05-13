const { Router } = require("express");
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
const protectedRouter = Router();
const { ensureAuthenticated, ensureAdmin } = require("../auth/auth-middleware");
const postMessageValidator = require("../controllers/postMessageValidator");

protectedRouter.get("/join-the-club", ensureAuthenticated, (req, res) => {
  res.render("join-the-club", { error: null });
});

protectedRouter.post(
  "/join-the-club",
  ensureAuthenticated,
  userController.setClubmember
);

protectedRouter.post(
  "/messages",
  ensureAuthenticated,
  postMessageValidator,
  messageController.addMessage
);

protectedRouter.delete(
  "/messages/:id",
  ensureAuthenticated,
  ensureAdmin,
  messageController.deleteMessage
);

module.exports = protectedRouter;
