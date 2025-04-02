const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define("Batch", {
    item_id: {
      type: DataTypes.INTEGER,
      reference: db.Item,
      reference_key: "item_id"
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

  // Batch.associated = function (models) {
  //   Batch.belongsTo(models.Item, {
  //     foreignKey: "item_id",
  //     as: "item"
  //   });
  // };

  return Batch;
};
