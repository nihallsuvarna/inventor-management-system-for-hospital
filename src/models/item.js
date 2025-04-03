module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      }
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Suppliers",
        key: "id"
      }
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

  return Item;
};
