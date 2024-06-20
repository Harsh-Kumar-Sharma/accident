/* eslint-disable */
const { BOOLEAN } = require('sequelize');
const { LICENSES } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const License = sequelize.define(
    LICENSES,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.NUMBER,
      },
      license_key: {
        type: DataTypes.STRING,
      },
      valid_from: {
        type: DataTypes.DATE,
      },
      valid_to: {
        type: DataTypes.DATE,
      },
      is_exp: {
        type: DataTypes.BOOLEAN
      },
      is_sync: {
        type: DataTypes.BOOLEAN
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );

  License.associate = function (models) {
    License.hasOne(models.customers, { foreignKey: 'id' });
  };

  return License;
};
