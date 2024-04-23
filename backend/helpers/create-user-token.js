const jwt = require("jsonwebtoken");

function createUserToken(user, req, res) {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "*9xcas325*0-6"
  );

  res
    .status(201)
    .json({ message: "Usuário logado com sucesso!", token, id: user._id });
}

module.exports = createUserToken;
