const express = require("express");
const bodyParser = require("body-parser");
// const crypto = require("crypto");
const TelegramBot = require("node-telegram-bot-api");
// const authenticateToken = require("./middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

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
