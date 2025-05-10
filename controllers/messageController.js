const db = require("../db/queries");

async function loadMessages(req, res, next) {
  try {
    const isClubmember = req.user?.clubmember || false;
    const messages = await db.getMessages({ withAuthor: isClubmember });
    res.locals.messages = messages;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  loadMessages,
};
