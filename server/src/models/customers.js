/* eslint-disable */
const { CUSTOMERS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    CUSTOMERS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      salutation: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      business_reg_no: {
        type: DataTypes.STRING,
      },
      business_name: {
        type: DataTypes.STRING,
      },
      business_type: {
        type: DataTypes.STRING,
      },
      display_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      is_gst_registered: {
        type: DataTypes.BOOLEAN,
      },
      gst: {
        type: DataTypes.STRING,
      },
      pan: {
        type: DataTypes.STRING,
      },
      address_1: {
        type: DataTypes.STRING,
      },
      address_2: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
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

  Customer.associate = function (models) {
    Customer.hasOne(models.licenses, { foreignKey: 'customer_id' });
  };

  return Customer;
};
