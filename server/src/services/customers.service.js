const { db } = require('../models');

const getAllCustomers = async () => {
  const result = await db.customers.findAll({
    order: [['id', 'DESC']],
  });
  return result;
};

const createNewCustomer = async (body) => {
  const business_name = await db.customers.findOne({
    where: {
      business_name: body.business_name,
    },
  });

  if (business_name) throw new Error('Company name is already exist.');

  try {
    await db.customers.create({
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  } catch (error) {
    throw new Error(error);
  }
  return true;
};

const getCustomerById = async (id) => {
  const result = await db.customers.findOne({
    where: {
      id,
    },
    include: [{ model: db.licenses }],
  });
  return result;
};

module.exports = {
  getAllCustomers,
  createNewCustomer,
  getCustomerById,
};
