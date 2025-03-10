const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      reference: db.Category,
      reference_key: "category_id"
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      reference: db.Supplier,
      reference_key: "supplier_id"
    },
    manufacturing_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    in_store: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Item.associate = function (models) {
    Item.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category"
    });

    Item.belongsTo(models.Supplier, {
      foreignKey: "supplier_id",
      as: "supplier"
    });
    // Many-to-many relationship with OrderOutward
    Item.belongsToMany(models.OrderOutward, {
      through: models.OrderOutwardItem,
      foreignKey: "item_id",
      otherKey: "order_outward_id",
      as: "orderOutwards"
    });
  };

  return Item;
};
