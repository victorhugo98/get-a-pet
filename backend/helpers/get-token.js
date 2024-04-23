async function getToken(req) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  } else return null;
}

module.exports = getToken;
