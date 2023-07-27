const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool } = require("../../config/database");

async function createUser(req, res) {
  try {
    const hashedPW = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${hashedPW}') RETURNING *`
    );
    const user = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE email = '${req.body.email}'`
    );
    const token = createJWT(user.rows[0]);
    res.status(200).json(token);
  } catch (err) {
    res.json(err.message);
  }
}

async function login(req, res) {
  try {
    const user = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE email = '${req.body.email}'`
    );
    if (!user) throw new Error("User not found.");
    const userPW = await pool.query(
      `SELECT password FROM users WHERE email = '${req.body.email}'`
    );
    const match = await bcrypt.compare(
      req.body.password,
      userPW.rows[0].password
    );
    if (!match) throw new Error("Password does not match.");
    res.json(createJWT(user.rows[0]));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function updateFirstName(req, res) {
  const userId = req.params.userId;
  try {
    await pool.query(
      `UPDATE users SET first_name = '${req.body.firstName}' WHERE users.id = ${userId}`
    );
    const user = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE users.id = ${userId}`
    );
    if (!user) throw new Error("User not found.");
    res.json(createJWT(user.rows[0]));
  } catch (err) {
    console.log(err.message);
    res.status(400).json("Bad Credentials");
  }
}

async function updateLastName(req, res) {
  const userId = req.params.userId;
  try {
    await pool.query(
      `UPDATE users SET last_name = '${req.body.lastName}' WHERE users.id = ${userId}`
    );
    const user = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE users.id = ${userId}`
    );
    if (!user) throw new Error("User not found.");
    res.json(createJWT(user.rows[0]));
  } catch (err) {
    console.log(err.message);
    res.status(400).json("Bad Credentials");
  }
}

async function updateEmail(req, res) {
  const userId = req.params.userId;
  try {
    await pool.query(
      `UPDATE users SET email = '${req.body.email}' WHERE users.id = ${userId}`
    );
    const user = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE users.id = ${userId}`
    );
    if (!user) throw new Error("User not found.");
    res.json(createJWT(user.rows[0]));
  } catch (err) {
    console.log(err.message);
    res.status(400).json("Bad Credentials");
  }
}

async function updatePassword(req, res) {
  const userId = req.params.userId;
  try {
    const hashedPW = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );
    await pool.query(
      `UPDATE users SET password = '${hashedPW}' WHERE users.id = ${userId}`
    );
    const user = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE users.id = ${userId}`
    );
    if (!user) throw new Error("User not found.");
    res.json(createJWT(user.rows[0]));
  } catch (err) {
    console.log(err.message);
    res.status(400).json("Bad Credentials");
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

module.exports = {
  createUser,
  login,
  checkToken,
  updateFirstName,
  updateLastName,
  updateEmail,
  updatePassword,
};
