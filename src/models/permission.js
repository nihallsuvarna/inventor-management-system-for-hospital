module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    module_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Modules",
        key: "id"
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id"
      }
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

  return Permission;
};
