const db = require("../db/queries");

async function addUser(req, res) {
  const { firstname, lastname, username, password } = req.body;
  try {
    await db.addUser({ firstname, lastname, username, password });
    console.log("User signed up with:", { firstname, lastname, username });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error signing up");
  }
}

module.exports = {
  addUser,
};
