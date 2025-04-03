module.exports = (sequelize, DataTypes) => {
  const TransactionInward = sequelize.define("TransactionInward", {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Departments",
        key: "id"
      }
    },
    order_outward_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "OrderOutwards",
        key: "id"
      }
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

  return TransactionInward;
};
