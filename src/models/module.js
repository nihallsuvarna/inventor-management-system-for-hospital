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
  });

  return Module;
};
