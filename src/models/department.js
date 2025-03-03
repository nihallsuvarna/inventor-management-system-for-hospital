module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
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

  return Department;
};
