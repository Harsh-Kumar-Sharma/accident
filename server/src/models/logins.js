/* eslint-disable */
const { LOGINS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    LOGINS,
    {
      user_id: {
        type: DataTypes.NUMBER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      is_logged_in: {
        type: DataTypes.BOOLEAN,
      },
      password: {
        type: DataTypes.STRING,
      },
        status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
