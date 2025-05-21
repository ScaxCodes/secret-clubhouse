const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const loadMessages = asyncHandler(async (req, res, next) => {
  if (!req.user) next();

  const isClubmember = req.user?.clubmember || false;
  const messages = await db.getMessages({ withAuthor: isClubmember });
  res.locals.messages = messages;
  next();
});

const addMessage = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.id;
  await db.addMessage({ userId, title, body });
  console.log("Message added by user:", {
    userId,
    title,
    body,
  });
  res.redirect("/");
});

const deleteMessage = asyncHandler(async (req, res) => {
  const messageId = req.params.id;
  await db.deleteMessageById(messageId);
  console.log("Message deleted with ID:", messageId);
  res.redirect("/");
});

module.exports = {
  loadMessages,
  addMessage,
  deleteMessage,
};
