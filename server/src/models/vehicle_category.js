const { VEHICLE_CATEGORY } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    VEHICLE_CATEGORY,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicle_category:{
        type: DataTypes.STRING,
      },
      vehicle_type:{
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
