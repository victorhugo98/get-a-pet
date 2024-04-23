const jwt = require("jsonwebtoken");
const User = require("../models/User");
const getToken = require("./get-token");

async function getUserByToken(req, res) {
  const token = await getToken(req);
  if (!token) {
    res.status(402).json({ message: "Acesso negado." });
    return;
  }
  const decoded = jwt.verify(token, "*9xcas325*0-6");
  const userId = decoded.id;
  const user = await User.findById(userId);
  return user;
}

module.exports = getUserByToken;
