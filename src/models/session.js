module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Session;
};
