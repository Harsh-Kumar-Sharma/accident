const { REASONS_OF_ACCIDENTS } = require('../config/tables')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(REASONS_OF_ACCIDENTS, {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reasons_of_accident: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true
  });
}