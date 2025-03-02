import express from "express";

import { register, signIn } from "../controllers/user";
import { auth } from "../middlewares";

const route = express.Router();

// Admin route
route.post("/register", register)

route.post("/sign-in", auth, signIn);
