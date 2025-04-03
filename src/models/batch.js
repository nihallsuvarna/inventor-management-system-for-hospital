module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define("Batch", {
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id"
      }
    },
    batch_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Batch;
};
