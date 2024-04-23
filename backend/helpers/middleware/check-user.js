const getToken = require("../get-token");


async function checkUser(req, res, next) {
  const token = await getToken(req);

  if (!token) {
    res.status(401).json({ message: "Acesso negado!" });
    return;
  }
  next();
}

module.exports = checkUser;
