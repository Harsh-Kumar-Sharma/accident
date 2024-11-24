const { VEHICLE_TYPE } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    VEHICLE_TYPE,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicle_type: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
