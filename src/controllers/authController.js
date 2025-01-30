const { generateJwtToken } = require("../utils/generetatokens");
// const { generateRefreshToken } = require("../utils/generetatokens");
const {
  JWT_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET,
  TELEGRAM_BOT_TOKEN,
} = require("../constants");

// const { checkTelegramAuth } = require("../utils/checkTelegramAuth");
const crypto = require("crypto");
let refreshTokens = {};

const checkTelegramAuth = (data, receivedHash) => {
  const secretKey = crypto
    .createHash("sha256")
    .update(TELEGRAM_BOT_TOKEN)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");
  return calculatedHash === receivedHash;
};

function checkValidateInitData(hashStr, initData, token, cStr = "WebAppData") {
  const sortedData = initData
    .split("&")
    .filter((chunk) => !chunk.startsWith("hash="))
    .map((chunk) => chunk.split("="))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
    .join("\n");

  const secretKey = new Uint8Array(
    crypto.createHmac("sha256", cStr).update(token).digest()
  );

  const dataCheck = crypto
    .createHmac("sha256", new Uint8Array(secretKey))
    .update(sortedData)
    .digest("hex");

  return dataCheck === hashStr;
}

// Функция для создания строки data
const createCheckString = (userData) => {
  const sortedKeys = Object.keys(userData)
    .filter((key) => key !== "hash")
    .sort();

  return sortedKeys.map((key) => `${key}=${userData[key]}`).join("\n");
};

const AuthController = {
  authTelegram: async (req, res) => {
    const { initData, userData } = req.body;
    // const userData = req.body;
    if (userData) {
      const { hash, ...dataForVerification } = userData;
      const data = createCheckString(dataForVerification);
      console.log(dataForVerification);
      if (!userData) {
        return res.status(400).send("Недостаточно данных для авторизации");
      }

      if (checkTelegramAuth(data, hash)) {
        const user = Object.fromEntries(new URLSearchParams(data));

        const accessToken = generateJwtToken(user, JWT_SECRET, JWT_EXPIRATION);
        const refreshToken = generateJwtToken(
          user,
          JWT_SECRET,
          REFRESH_TOKEN_EXPIRATION
        );

        refreshTokens[user.id] = refreshToken;

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 86400000,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 86400000,
        });
        console.log("ok");
        res.json({ status: "ok" });
      } else {
        res.status(401).send("Ошибка авторизации");
      }
    }

    if (initData) {
      const params = new URLSearchParams(initData);
      const hash = params.get("hash");

      if (checkValidateInitData(hash, initData, TELEGRAM_BOT_TOKEN)) {
        const user = JSON.parse(decodeURIComponent(params.get("user")));

        const accessToken = generateJwtToken(user, JWT_SECRET, JWT_EXPIRATION);
        const refreshToken = generateJwtToken(
          user,
          JWT_SECRET,
          REFRESH_TOKEN_EXPIRATION
        );

        refreshTokens[user.id] = refreshToken;

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 86400000, // 1 день
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 86400000, // 1 день
        });
        console.log("ok");
        res.json({ status: "ok" });
      } else {
        res.status(401).send("Ошибка авторизации");
      }
    }
  },
};

module.exports = AuthController;
