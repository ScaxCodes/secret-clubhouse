const pool = require("./pool");

const SQL_ADD_USER = /*sql*/ `
  INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *`;

async function addUser(user) {
  const { firstname, lastname, username, password } = user;
  const values = [firstname, lastname, username, password];
  try {
    const { rows } = await pool.query(SQL_ADD_USER, values);
    return rows[0];
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

const SQL_UPDATE_CLUBMEMBER = /*sql*/ `
  UPDATE users
  SET clubmember = true
  WHERE id = $1
  RETURNING *`;

async function setClubmember(userId) {
  try {
    const { rows } = await pool.query(SQL_UPDATE_CLUBMEMBER, [userId]);
    return rows[0];
  } catch (error) {
    console.error("Error updating clubmember status:", error);
    throw error;
  }
}

const SQL_GET_MESSAGES_WITH_AUTHOR = /*sql*/ `
  SELECT 
    messages.title,
    messages.body,
    messages.timestamp,
    users.username AS author
  FROM messages
  JOIN users ON messages.author_id = users.id
  ORDER BY messages.timestamp DESC;
`;

const SQL_GET_MESSAGES_NO_AUTHOR = /*sql*/ `
  SELECT 
    title,
    body
  FROM messages
  ORDER BY timestamp DESC;
`;

async function getMessages({ withAuthor }) {
  const query = withAuthor
    ? SQL_GET_MESSAGES_WITH_AUTHOR
    : SQL_GET_MESSAGES_NO_AUTHOR;

  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  addUser,
  setClubmember,
  getMessages,
};
