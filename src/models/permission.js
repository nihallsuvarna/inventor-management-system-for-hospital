const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    module_id: {
      type: DataTypes.STRING,
      reference: db.Module,
      reference_key: "module_id"
    },
    role_id: {
      type: DataTypes.INTEGER,
      reference: db.Role,
      reference_key: "role_id"
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isWrite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  // Permission.associate = function (models) {
  //   Permission.belongTo(models.Role, {
  //     foreignKey: "role_id",
  //     as: "role"
  //   });
  //   Permission.belongTo(models.Module, {
  //     foreignKey: "module_id",
  //     as: "module"
  //   });
  // };

  return Permission;
};
