/* eslint-disable */
const { ACCIDENT_DATA } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    ACCIDENT_DATA,
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      incident_id: {
        type: DataTypes.DOUBLE,
      },
      accident_date: {
        type: DataTypes.DATEONLY,
      },
      accident_time: {
        type: DataTypes.TIME,
      },
      location: {
        type: DataTypes.STRING(45),
      },
      direction: {
        type: DataTypes.STRING(45),
      },
      primary_vehicle: {
        type: DataTypes.STRING(45),
      },
      secondary_vehicle: {
        type: DataTypes.STRING(45),
      },
      third_vehicle: {
        type: DataTypes.STRING(45),
      },
      forth_vehicle:{
        type: DataTypes.STRING(45),
      },
      source_of_information: {
        type: DataTypes.STRING(45),
      },
      no_of_person_involve_in_accident: {
        type: DataTypes.STRING(45),
      },
      fatal_injury: {
        type: DataTypes.INTEGER,
      },
      major_injury: {
        type: DataTypes.INTEGER,
      },
      minor_injury: {
        type: DataTypes.INTEGER,
      },
      no_injury: {
        type: DataTypes.INTEGER,
      },
      rpv_response_time: {
        type: DataTypes.TIME,
      },
      ambulance_response_time: {
        type: DataTypes.TIME,
      },
      recovery_response_time: {
        type: DataTypes.TIME,
      },
      reason_of_accidents: {
        type: DataTypes.STRING(45),
      },
      location_value: {
        type: DataTypes.FLOAT,
      },
      location_zone: {
        type: DataTypes.STRING(45),
      },
      // accident_time_in_value: {
      //   type: DataTypes.FLOAT,
      // },
      times_of_the_day: {
        type: DataTypes.STRING(45),
      },
      light: {
        type: DataTypes.INTEGER,
      },
      heavy: {
        type: DataTypes.INTEGER,
      },
      non_tollable: {
        type: DataTypes.INTEGER,
      },
      unknown: {
        type: DataTypes.INTEGER,
      },
      blackspot_location_value: {
        type: DataTypes.STRING(45),
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  // Corrected the spelling of 'defaultValue'
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
