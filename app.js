const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const db = require("./src/models");
require("dotenv").config();
const {
  authRoute,
  dashboardRoute,
  userManagementRoute
} = require("./src/routes");

const app = express();
const path = "/admin";
console.log(path, "this is path");

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Auth
app.use(`${path}/api`, authRoute);

// Dashboard
app.use(`${path}/api`, dashboardRoute);

// User Management
app.use(`${path}/api`, userManagementRoute);

// app.use(`${path}/api`, userRoute);

// // Admin
// app.use(`${path}/api`, departmentRoute);
// app.use(`${path}/api`, categoryRoute);
// app.use(`${path}/api`, userRoute);
// app.use(`${path}/api`, moduleRoute);
// app.use(`${path}/api`, supplierRoute);
// app.use(`${path}/api`, permissionRoute);

// // Sales person
// app.use(`${path}/api`, orderTypeRoute);
// app.use(`${path}/api`, orderOutwardRoute);
// app.use(`${path}/api`, customerRoute);

// //Items
// app.use(`${path}/api`, itemRoute);

// // Role
// app.use(`${path}/api`, roleRoute);

module.exports = app;
