const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {vehicleCategory} = require('../services')

const createvehicleCategory = catchAsync(async (req, res) => {
 const data = await vehicleCategory.createvehicleCategory(req.body);
  res.status(httpStatus.OK).send(data);
});

// get all users
const getvehicleCategorys = catchAsync(async (req, res) => {
    const { page } = req.query;
    const getData = await vehicleCategory.getvehicleCategory(page?page:1);
    res.status(200).json({
      status: 'success',
      data:getData,
    });
  });
  
 
  
  // update user
  const updatevehicleCategory = catchAsync(async (req, res) => {
    const updatedvehicleCategory = await vehicleCategory.updatevehicleCategory(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        vehicleCategory: updatedvehicleCategory,
      },
    });
  });
  
  // delete vehicleCategory
  const deletevehicleCategory = catchAsync(async (req, res) => {
    const vehicleCategoryId = req.params.id;
    const deletedvehicleCategory = await vehicleCategory.deletevehicleCategory(vehicleCategoryId);
    res.status(200).json({
      status: 'success',
      data: {
        vehicleCategory: deletedvehicleCategory,
      },
    });
  });



module.exports = {
    createvehicleCategory,
    getvehicleCategorys,
    updatevehicleCategory,
    deletevehicleCategory,
};
