const { TIME_OF_DAY } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    TIME_OF_DAY,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      time_of_day: {
        type: DataTypes.STRING,
      },
      start_time: {
        type: DataTypes.TIME,
      },
      end_time: {
        type: DataTypes.TIME,
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
