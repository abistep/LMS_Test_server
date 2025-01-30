const { JWT_SECRET } = require("./constants");
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  const userAgent = req.headers["user-agent"];

  const isTelegram = /Telegram/i.test(userAgent);
  if (isTelegram) {
    return next();
  }

  if (!token) {
    return res.status(401).send({ error: "Требуется авторизация" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: "Неверный токен" });
    }
    next();
  });
};

module.exports = authenticateToken;
