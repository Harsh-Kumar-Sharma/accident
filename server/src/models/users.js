const { USERS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    USERS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },

      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      // is_active: {
      //   type: DataTypes.BOOLEAN,
      // },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  Users.associate = function (models) {
    Users.hasOne(models.logins, { foreignKey: 'user_id' });
    Users.hasOne(models.user_role_mappings, { foreignKey: 'user_id' });
  };

  return Users;
};
