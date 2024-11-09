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
        type: DataTypes.STRING,
      },
      end_time: {
        type: DataTypes.STRING,
      },
      value_from: {
        type: DataTypes.FLOAT,
      },
      value_to: {
        type: DataTypes.FLOAT,
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
