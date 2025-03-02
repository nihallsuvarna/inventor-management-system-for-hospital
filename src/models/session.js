const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    user_id: {
      type: DataTypes.INTEGER,
      references: db.User,
      references_key: "user_id"
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Session.associated = function (models) {
    Session.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
  };

  return Session;
};
