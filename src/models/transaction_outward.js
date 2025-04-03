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
      references: {
        model: "Departments",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    order_inward_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "OrderInwards",
        key: "id"
      }
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
      references: {
        model: "Suppliers",
        key: "id"
      }
    }
  });

  return TransactionOutward;
};
