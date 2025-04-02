const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const TransactionOutward = sequelize.define("TransactionOutward", {
    transaction_type: {
      type: DataTypes.ENUM("cash", "card", "online"),
      allowNull: false,
      defaultValue: "cash"
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: db.Department,
      references_key: "department_id"
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: db.User,
      references_key: "user_id"
    },
    order_inward_id: {
      type: DataTypes.INTEGER,
      references: db.OrderInward,
      references_key: "order_inward_id"
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      reference: db.Supplier,
      reference_key: "supplier_id"
    }
  });

  // TransactionOutward.associate = function (models) {
  //   TransactionOutward.belongsTo(models.User, {
  //     foreignKey: "user_id",
  //     as: "user"
  //   });
  //   TransactionOutward.belongsTo(models.Department, {
  //     foreignKey: "department_id",
  //     as: "department"
  //   });
  //   TransactionOutward.belongsTo(models.OrderOutward, {
  //     foreignKey: "order_inward_id",
  //     as: "orderInward"
  //   });
  //   TransactionOutward.belongsTo(models.Supplier, {
  //     foreignKey: "supplier_id",
  //     as: "supplier"
  //   });
  // };

  return TransactionOutward;
};
