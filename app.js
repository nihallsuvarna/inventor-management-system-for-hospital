const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const db = require("./src/models");

const { userRoute } = require("./src/routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/admin", userRoute);

module.exports = app
