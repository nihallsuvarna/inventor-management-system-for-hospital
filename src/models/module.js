module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define("Module", {
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
      allowNull: false,
      unique: true
    }
  });

  return Module;
};
