const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const OrderOutward = sequelize.define("OrderOutward", {
    order_type_id: {
      type: DataTypes.INTEGER,
      reference: db.OrderType,
      reference_key: "order_type"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_inward_id: {
      type: DataTypes.INTEGER,
      reference: db.TransactionInward,
      reference_key: "transaction_inward_id"
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    issued_by: {
      type: DataTypes.INTEGER,
      reference: db.User,
      reference_key: "issued_by"
    }
  });

  OrderOutward.associate = function (models) {
    OrderOutward.belongsTo(models.OrderType, {
      foreignKey: "order_type_id",
      as: "orderType"
    });
    OrderOutward.belongsTo(models.TransactionInward, {
      foreignKey: "transaction_inward_id",
      as: "transactionInward"
    });
    OrderOutward.belongsTo(models.User, {
      foreignKey: "issued_by",
      as: "user"
    });

    // Many-to-many relationship with Items
    OrderOutward.belongsToMany(models.Item, {
      through: models.OrderOutwardItem,
      foreignKey: "order_outward_id",
      otherKey: "item_id",
      as: "items"
    });
  };

  return OrderOutward;
};
