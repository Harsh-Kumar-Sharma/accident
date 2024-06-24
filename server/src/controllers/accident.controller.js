const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { accidentService} = require('../services');



const insertAccident = catchAsync(async (req, res) => {
  const data = await accidentService.insertAccidentData();
  res.status(httpStatus.OK).send(data);
});

module.exports = {
    insertAccident,
};
