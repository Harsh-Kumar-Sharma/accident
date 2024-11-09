const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { accidentService} = require('../services');
const { getDataforDashboard } = require('../services/accident.service');



const insertAccident = catchAsync(async (req, res) => {
  const data = await accidentService.insertAccidentData();
  res.status(httpStatus.OK).send(data);
});


const createAccident = catchAsync(async (req, res) => {
  const data = await accidentService.createAccident(req.body);
  res.status(httpStatus.OK).send(data);
});

const getAllAccident = catchAsync(async (req, res) => {
  const data = await accidentService.getAccidentData(req.body,req.params.page);
  res.status(httpStatus.OK).send(data);
});

const getDashboardData = catchAsync(async (req, res) => {
  const data = await accidentService.getDataforDashboard(req.body);
  res.status(httpStatus.OK).send(data);
});

module.exports = {
    insertAccident,
    createAccident,
    getAllAccident,
    getDashboardData
};
