const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const OrderInwardItem = sequelize.define("OrderInwardItem", {
    order_inward_id: {
      type: DataTypes.INTEGER,
      reference: db.OrderInward,
      reference_key: "order_inward_id "
    },
    item_id: {
      type: DataTypes.INTEGER,
      reference: db.Item,
      reference_key: "item_id "
    }
  });

  return OrderInwardItem;
};
