const { USER_ROLE_MAPPINGS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const userRoleMappings = sequelize.define(
    USER_ROLE_MAPPINGS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: DataTypes.NUMBER,
      },
      user_id: {
        type: DataTypes.NUMBER,
      },
    },

    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );

  userRoleMappings.associate = function (models) {
    userRoleMappings.belongsTo(models.users, { foreignKey: 'user_id' });
    userRoleMappings.belongsTo(models.roles, { foreignKey: 'role_id' });
  };

  return userRoleMappings
};
