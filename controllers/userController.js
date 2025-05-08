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

module.exports = {
  addUser,
};
