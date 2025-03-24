const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const OrderOutwardItem = sequelize.define("OrderOutwardItem", {
    order_outward_id: {
      type: DataTypes.INTEGER,
      reference: db.OrderOutward,
      reference_key: "order_outward_id "
    },
    item_id: {
      type: DataTypes.INTEGER,
      reference: db.Item,
      reference_key: "item_id "
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return OrderOutwardItem;
};
