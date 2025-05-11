const db = require("../db/queries");

async function loadMessages(req, res, next) {
  if (!req.user) next();
  try {
    const isClubmember = req.user?.clubmember || false;
    const messages = await db.getMessages({ withAuthor: isClubmember });
    res.locals.messages = messages;
    next();
  } catch (err) {
    next(err);
  }
}

async function addMessage(req, res, next) {
  try {
    const { title, body } = req.body;
    const userId = req.user.id;
    await db.addMessage({ userId, title, body });
    console.log("Message added by user:", {
      userId,
      title,
      body,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function deleteMessage(req, res, next) {
  try {
    const messageId = req.params.id;
    await db.deleteMessageById(messageId);
    console.log("Message deleted with ID:", messageId);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  loadMessages,
  addMessage,
  deleteMessage,
};
