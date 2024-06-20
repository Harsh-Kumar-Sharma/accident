const { USERS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    USERS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
      },

      last_name: {
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
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
