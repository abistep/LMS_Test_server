// const { TELEGRAM_BOT_TOKEN } = require("../constants");

// const checkTelegramAuth = (data, hash) => {
//   const secret = Buffer.from(TELEGRAM_BOT_TOKEN, "hex");
//   const calculatedHash = crypto
//     .createHmac("sha256", secret)
//     .update(data)
//     .digest("hex");

//   return calculatedHash === hash;
// };

// module.exports = checkTelegramAuth;
