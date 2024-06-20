const catchAsync = require('../utils/catchAsync');
const { licensesService } = require('../services');

const getAllLicenses = catchAsync(async (req, res) => {
  const result = await licensesService.getAllLicenses();
  res.send(result);
});

const createNewLicense = catchAsync(async (req, res) => {
  const result = await licensesService.createNewLicense(req.body);
  res.send(result);
});

const getLicensesForSync = catchAsync(async (req, res) => {
  const result = await licensesService.getLicensesForSync();
  res.send(result);
});
const updateSyncLicensesStatus = catchAsync(async (req, res) => {
  await licensesService.updateSyncLicensesStatus(req.params.id);
  res.send({
    status: 'ok',
    data: "updated"
  });
});
module.exports = {
  getAllLicenses,
  createNewLicense,
  getLicensesForSync,
  updateSyncLicensesStatus
};
