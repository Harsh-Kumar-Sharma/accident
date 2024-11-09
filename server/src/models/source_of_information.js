const { SOURCE_OF_INFORMATION } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    SOURCE_OF_INFORMATION,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      source_of_information: {
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
