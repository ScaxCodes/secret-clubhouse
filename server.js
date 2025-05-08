const express = require("express");
const server = express();
const userRouter = require("./routes/userRouter");

const PORT = process.env.PORT || 8000;

server.use(express.urlencoded({ extended: false }));
server.use(express.static("public"));

const path = require("node:path");
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/", userRouter);

server.listen(PORT, () =>
  console.log(`Express Server running at http://localhost:${PORT}...`)
);
