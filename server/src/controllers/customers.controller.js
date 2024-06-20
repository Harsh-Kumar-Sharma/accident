const catchAsync = require('../utils/catchAsync');
const { customersService } = require('../services');

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await customersService.getAllCustomers();
  res.send(result);
});

const createNewCustomer = catchAsync(async (req, res) => {
  const result = await customersService.createNewCustomer(req.body);
  res.send(result);
});

const getCustomerById = catchAsync(async (req, res) => {
  const result = await customersService.getCustomerById(req.params.id);
  res.send(result);
});

module.exports = {
  getAllCustomers,
  createNewCustomer,
  getCustomerById,
};
