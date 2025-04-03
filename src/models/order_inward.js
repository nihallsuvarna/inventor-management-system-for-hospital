module.exports = (sequelize, DataTypes) => {
  const OrderInward = sequelize.define("OrderInward", {
    order_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "OrderTypes",
        key: "id"
      }
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
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  return OrderInward;
};
