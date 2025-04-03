module.exports = (sequelize, DataTypes) => {
  const OrderOutwardItem = sequelize.define("OrderOutwardItem", {
    order_outward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "OrderOutwards",
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

  return OrderOutwardItem;
};
