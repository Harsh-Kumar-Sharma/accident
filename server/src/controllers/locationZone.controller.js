const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const locationZoneService = require('../services/locationZone.service')

const getLocationZone = catchAsync(async (req, res) => {
 const data = await locationZoneService.getLocationZone();
  res.status(httpStatus.OK).send(data);
});

module.exports = {
    getLocationZone
};
