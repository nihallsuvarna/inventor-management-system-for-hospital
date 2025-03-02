module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
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

  return Category;
};
