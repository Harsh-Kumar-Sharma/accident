const { LOCATION_ZONE } = require('../config/tables')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(LOCATION_ZONE, {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_zone: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true
  });
}