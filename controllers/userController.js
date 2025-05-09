const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function addUser(req, res) {
  const { firstname, lastname, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.addUser({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });
    console.log("User signed up with:", {
      firstname,
      lastname,
      username,
      hashedPassword,
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error signing up");
  }
}

async function setClubmember(req, res) {
  const { password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY;

  if (password !== SECRET_KEY) {
    return res.render("join-the-club", {
      error: "Incorrect key, please try again.",
    });
  }

  try {
    await db.setClubmember(req.user.id);
    console.log(
      "User",
      req.user.username,
      "with ID:",
      req.user.id,
      "is now a club member."
    );
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error updating clubmember status");
  }
}

module.exports = {
  addUser,
  setClubmember,
};
