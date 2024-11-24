const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {vehicleTypeService} = require('../services')

const createVehicleType = catchAsync(async (req, res) => {
 const data = await vehicleTypeService.createVehicleType(req.body);
  res.status(httpStatus.OK).send(data);
});

// get all users
const getVehicleTypes = catchAsync(async (req, res) => {
    const { page } = req.query;
    const getData = await vehicleTypeService.getvehicleType(page?page:1);
    res.status(200).json({
      status: 'success',
      data:getData,
    });
  });
  
 
  
  // update user
  const updateVehicleType = catchAsync(async (req, res) => {
    const updatedVehicleType = await vehicleTypeService.updateVehicleType(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: updatedVehicleType,
    });
  });
  
  // delete VehicleType
  const deleteVehicleType = catchAsync(async (req, res) => {
    const VehicleTypeId = req.params.id;
    const deletedVehicleType = await vehicleTypeService.deleteVehicleType(VehicleTypeId);
    res.status(200).json({
      status: 'success',
      data: {
        VehicleType: deletedVehicleType,
      },
    });
  });



module.exports = {
    createVehicleType,
    getVehicleTypes,
    updateVehicleType,
    deleteVehicleType,
};
