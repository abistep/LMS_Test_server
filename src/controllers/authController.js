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

// const checkTelegramAuthTG = (data, receivedHash) => {
//   // Создаем секретный ключ SHA256 от токена бота
//   const secretKey = crypto
//     .createHash("sha256")
//     .update(TELEGRAM_BOT_TOKEN)
//     .digest();

//   // Создаем строку проверки (data-check-string)
//   const sortedKeys = Object.keys(data)
//     .filter((key) => key !== "hash") // Исключаем сам `hash`
//     .sort(); // Сортируем ключи в алфавитном порядке

//   const dataCheckString = sortedKeys
//     .map((key) => `${key}=${data[key]}`)
//     .join("\n");

//   // Создаем HMAC-SHA256 от строки проверки
//   const calculatedHash = crypto
//     .createHmac("sha256", secretKey)
//     .update(dataCheckString)
//     .digest("hex");

//   // Сравниваем рассчитанный хэш с переданным
//   return calculatedHash === receivedHash;
// };

// function isValidHash(initData) {
//   const parsedData = new URLSearchParams(initData);
//   const hash = parsedData.hash;
//   const data_keys = Object.keys(parsedData)
//     .filter((v) => v !== "hash")
//     .sort();
//   const items = data_keys.map((key) => key + "=" + parsedData[key]);

//   const data_check_string = items.join("\n");

//   function HMAC_SHA256(value, key) {
//     return crypto.createHmac("sha256", key).update(value).digest();
//   }

//   function hex(bytes) {
//     return bytes.toString("hex");
//   }

//   const secret_key = HMAC_SHA256(TELEGRAM_BOT_TOKEN, "WebAppData");

//   const hashGenerate = hex(HMAC_SHA256(data_check_string, secret_key));

//   return Boolean(hashGenerate === hash);
// }

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
  // Parse and sort the init data
  const sortedData = initData
    .split("&")
    .filter((chunk) => !chunk.startsWith("hash="))
    .map((chunk) => chunk.split("="))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
    .join("\n");

  // Create secret key
  const secretKey = new Uint8Array(
    crypto.createHmac("sha256", cStr).update(token).digest()
  );

  // Generate the data check hash
  const dataCheck = crypto
    .createHmac("sha256", new Uint8Array(secretKey))
    .update(sortedData)
    .digest("hex");

  // Compare the generated hash with the provided hash
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
  //   auth: async (req, res) => {
  //     const user = { id: req.body.id, username: req.body.username };

  //     const accessToken = generateAccessToken(user);
  //     const refreshToken = generateRefreshToken(user);

  //     res.cookie("refreshToken", refreshToken, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "strict",
  //     });

  //     res.send({ accessToken });
  //   },
  //   refreshToken: async (req, res) => {
  //     const refreshToken = req.cookies.refreshToken;

  //     if (!refreshToken || !refreshTokens[refreshToken]) {
  //       return res
  //         .status(403)
  //         .send("Refresh token отсутствует или недействителен");
  //     }

  //     jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
  //       if (err) {
  //         return res.status(403).send("Refresh token невалиден");
  //       }

  //       // Генерация нового Access Token
  //       const newAccessToken = generateJwtToken(
  //         decoded,
  //         JWT_SECRET,
  //         JWT_EXPIRATION
  //       );

  //       // Обновляем Access Token в cookie
  //       res.cookie("accessToken", newAccessToken, {
  //         httpOnly: true,
  //         // secure: process.env.NODE_ENV === 'production',
  //         sameSite: "Strict",
  //       });

  //       res.send("Access token обновлен");
  //     });
  //   },
  //   logout: async (req, res) => {
  //     res.clearCookie("accessToken");
  //     res.clearCookie("refreshToken");
  //     res.send("Вы вышли из системы");
  //   },
};

module.exports = AuthController;
