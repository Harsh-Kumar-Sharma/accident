const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {VehicleTypeService} = require('../services')

const createVehicleType = catchAsync(async (req, res) => {
 const data = await VehicleTypeService.createVehicleType(req.body);
  res.status(httpStatus.OK).send(data);
});

// get all users
const getVehicleTypes = catchAsync(async (req, res) => {
    const { page } = req.query;
    const getData = await VehicleTypeService.getVehicleTypes(page?page:1);
    res.status(200).json({
      status: 'success',
      data: {
        getData,
      },
    });
  });
  
 
  
  // update user
  const updateVehicleType = catchAsync(async (req, res) => {
    const updatedVehicleType = await VehicleTypeService.updateVehicleType(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        VehicleType: updatedVehicleType,
      },
    });
  });
  
  // delete VehicleType
  const deleteVehicleType = catchAsync(async (req, res) => {
    const VehicleTypeId = req.params.id;
    const deletedVehicleType = await VehicleTypeService.deleteVehicleType(VehicleTypeId);
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
