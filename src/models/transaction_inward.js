const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const TransactionInward = sequelize.define("TransactionInward", {
    user_id: {
      type: DataTypes.INTEGER,
      references: db.User,
      references_key: "user_id"
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: db.Department,
      references_key: "department_id"
    },
    order_outward_id: {
      type: DataTypes.INTEGER,
      references: db.Order,
      references_key: "order_id"
    },
    transaction_type: {
      type: DataTypes.ENUM("cash", "card", "online"),
      allowNull: false,
      defaultValue: "cash"
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  TransactionInward.associate = function (models) {
    TransactionInward.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
    TransactionInward.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department"
    });
    TransactionInward.belongsTo(models.OrderOutward, {
      foreignKey: "order_outward_id",
      as: "orderOutward"
    });
  };

  return TransactionInward;
};
