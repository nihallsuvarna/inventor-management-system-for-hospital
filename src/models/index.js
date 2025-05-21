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
db.Batch = require("./batch.js")(sequelize, DataTypes);

console.log("Models running");
console.log("Models loaded successfully");

// Associations
// User Associations
// db.User.hasMany(db.UserRole);

// Department Associations
db.Department.hasMany(db.User);
db.Department.hasMany(db.TransactionInward);

// Category Associations
db.Category.hasMany(db.Supplier);
db.Category.hasMany(db.Item);

// Item Associations
db.Item.hasMany(db.Batch, { foreignKey: "item_id", as: "batch" });
db.Item.belongsToMany(db.OrderOutward, {
  through: db.OrderOutwardItem,
  foreignKey: "item_id",
  as: "order_outward"
});
db.Item.belongsToMany(db.OrderInward, {
  through: db.OrderInwardItem,
  foreignKey: "item_id",
  as: "order_inward"
});
db.Item.belongsTo(db.Category, { foreignKey: "category_id", as: "category" });
db.Item.belongsTo(db.Supplier, { foreignKey: "supplier_id", as: "supplier" });

// Module Associations
db.Module.hasMany(db.Permission, { foreignKey: "module_id" });

// OrderInwardItem Associations
db.OrderInwardItem.belongsTo(db.OrderInward);
db.OrderInwardItem.belongsTo(db.Item);

// OrderInward Associations
db.OrderInward.belongsTo(db.OrderType);
db.OrderInward.belongsTo(db.User);
db.OrderInward.belongsToMany(db.Item, {
  through: db.OrderInwardItem,
  foreignKey: "order_inward_id"
});

// Order OutwardItem Associations
db.OrderOutwardItem.belongsTo(db.OrderOutward);
db.OrderOutwardItem.belongsTo(db.Item);

// Order Outward Associations
db.OrderOutward.belongsTo(db.OrderType);
db.OrderOutward.belongsTo(db.User);
db.OrderOutward.belongsToMany(db.Item, {
  through: db.OrderOutwardItem,
  foreignKey: "order_outward_id"
});

// Order Type Associations
db.OrderType.hasMany(db.OrderInward);
db.OrderType.hasMany(db.OrderOutward);

// Permission Associations
db.Permission.belongsTo(db.Module, { foreignKey: "module_id", as: "module" });
db.Permission.belongsTo(db.Role, { foreignKey: "role_id", as: "role" });

// Role Associations
// db.Role.belongsTo(db.UserRole);
// db.Role.belongsTo(db.Permission);

// Session Associations
db.Session.belongsTo(db.User);

// Supplier Associations
db.Supplier.belongsTo(db.Category);
db.Supplier.hasMany(db.Item);

// Transaction Inward Associations
db.TransactionInward.belongsTo(db.User);
db.TransactionInward.belongsTo(db.OrderOutward);
db.TransactionInward.belongsTo(db.Department);

// Transaction Outward Associations
db.TransactionOutward.belongsTo(db.OrderInward);
db.TransactionOutward.belongsTo(db.Supplier);

// Junction Tables
db.User.belongsToMany(db.Role, {
  through: db.UserRole,
  foreignKey: "user_id",
  otherKey: "role_id"
});

db.Role.belongsToMany(db.User, {
  through: db.UserRole,
  foreignKey: "role_id",
  otherKey: "user_id"
});

// User Role Associations
db.User.hasMany(db.UserRole, { foreignKey: "user_id" });
db.UserRole.belongsTo(db.User, { foreignKey: "user_id" });

db.Role.hasMany(db.UserRole, { foreignKey: "role_id" });
db.UserRole.belongsTo(db.Role, { foreignKey: "role_id" });

// User Associations
db.User.hasMany(db.Session);
db.User.hasMany(db.OrderInward);
db.User.hasMany(db.OrderOutward);
db.User.belongsTo(db.Department);

console.log("Associations set up successfully");

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
