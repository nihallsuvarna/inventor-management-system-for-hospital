const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const OrderInward = sequelize.define("OrderInward", {
    order_type_id: {
      type: DataTypes.INTEGER,
      reference: db.OrderType,
      reference_key: "order_type"
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    order_complete: {
      type: DataTypes.DATE,
      allowNull: false
    },
    issued_by: {
      type: DataTypes.INTEGER,
      reference: db.User,
      reference_key: "issued_by"
    }
  });

  // OrderInward.associate = function (models) {
  //   OrderInward.belongsTo(models.OrderType, {
  //     foreignKey: "order_type_id",
  //     as: "orderType"
  //   });
  //   OrderInward.belongsTo(models.TransactionOutward, {
  //     foreignKey: "transaction_outward_id",
  //     as: "transactionOutput"
  //   });
  //   OrderInward.belongsTo(models.User, {
  //     foreignKey: "issued_by",
  //     as: "user"
  //   });

  //   // Many-to-many relationship with Items
  //   OrderInward.belongsToMany(models.Item, {
  //     through: models.OrderInwardItem,
  //     foreignKey: "order_inward_id",
  //     otherKey: "item_id",
  //     as: "items"
  //   });
  // };
  return OrderInward;
};
