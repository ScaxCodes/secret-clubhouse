const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const addUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
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
});

const setClubStatus = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY;

  if (password !== SECRET_KEY && password !== process.env.ADMIN_KEY) {
    return res.render("join-the-club", {
      error: "Incorrect key, please try again.",
    });
  }

  const ADMIN_KEY = process.env.ADMIN_KEY;
  if (password === ADMIN_KEY) {
    await db.setAdmin(req.user.id);
    console.log(
      "User",
      req.user.username,
      "with ID:",
      req.user.id,
      "is now an admin."
    );
  }

  await db.setClubmember(req.user.id);
  console.log(
    "User",
    req.user.username,
    "with ID:",
    req.user.id,
    "is now a club member."
  );
  res.redirect("/");
});

module.exports = {
  addUser,
  setClubStatus,
};
