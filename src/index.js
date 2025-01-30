const express = require("express");
const bodyParser = require("body-parser");
// const crypto = require("crypto");
const TelegramBot = require("node-telegram-bot-api");
// const authenticateToken = require("./middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

const { TELEGRAM_BOT_TOKEN } = require("./constants");

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: (origin, callback) => callback(null, true),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", require("./routes/routes"));

app.listen(port, () => console.log("Сервер запущен на http://localhost:3000"));

const start = () => {
  bot.setMyCommands([
    { command: "/info", description: "Information" },
    { command: "/game", description: "Game" },
    { command: "/shop", description: "Shop" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (text === "/info") {
      await bot.sendMessage(chatId, `Your name ${msg.from.first_name}`);
    }

    if (text === "/shop") {
      bot.sendMessage(
        chatId,
        "Нажмите на кнопку ниже, чтобы открыть магазин:",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Открыть магазин",
                  web_app: {
                    url: `https://willowy-pastelito-e13e4c.netlify.app`,
                  },
                },
              ],
            ],
          },
        }
      );
      return;
    }
  });
};

start();
