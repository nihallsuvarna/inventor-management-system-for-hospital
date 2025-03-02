const { Sequelize, DataTypes } = require("sequelize");

const config = require("../../config/config.js");
const sequelize = new Sequelize(config.production);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user.js")(sequelize, DataTypes);
db.Department = require("./department.js")(sequelize, DataTypes);
db.OrderOutward = require("./order_outward.js")(sequelize, DataTypes);
db.Session = require("./session.js")(sequelize, DataTypes);
db.TransactionInward = require("./transaction_inward.js")(sequelize, DataTypes);
db.TransactionOutward = require("./transaction_outward.js")(
  sequelize,
  DataTypes
);

db.UserRole = require("./user_role.js")(sequelize, DataTypes);
db.OrderOutwardItem = require("./order_outward_item.js")(sequelize, DataTypes);
db.Supplier = require("./supplier.js")(sequelize, DataTypes);
db.Category = require("./category.js")(sequelize, DataTypes);
db.Role = require("./role.js")(sequelize, DataTypes);
db.Module = require("./module.js")(sequelize, DataTypes);
db.Permission = require("./permission.js")(sequelize, DataTypes);
db.OrderType = require("./order_type.js")(sequelize, DataTypes);

db.OrderInwardItem = require("./order_inward_item.js")(sequelize, DataTypes);

db.OrderInward = require("./order_inward.js")(sequelize, DataTypes);
db.Item = require("./item.js")(sequelize, DataTypes);

console.log("Models running");

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables have been synchronized.");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

module.exports = db;
