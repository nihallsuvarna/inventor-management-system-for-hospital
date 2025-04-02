const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("Supplier", {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_info: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      reference: db.Category,
      reference_key: "category_id"
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Supplier.associate = function (models) {
  //   Supplier.belongsTo(models.Category, {
  //     foreignKey: "category_id",
  //     as: "category"
  //   });
  // };

  return Supplier;
};
