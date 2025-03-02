module.exports = (sequelize, DataTypes) => {
    const OrderType = sequelize.define("OrderType", {
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return OrderType;
  };
  