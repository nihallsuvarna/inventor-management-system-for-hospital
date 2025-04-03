module.exports = (sequelize, DataTypes) => {
  const OrderInwardItem = sequelize.define("OrderInwardItem", {
    order_inward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "OrderInward",
        key: "id"
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return OrderInwardItem;
};
