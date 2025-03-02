import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import db from "./src/models";

import { userRoute } from "./src/routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);

module.exports = app;
