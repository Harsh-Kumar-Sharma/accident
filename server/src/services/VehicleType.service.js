const { db } = require('../models');


const createVehicleType = async (payload) => {
  // Pre-validation
  const existsUser = await db.vehicle_types.findOne({
    where: {
        vehicle_type: payload.vehicleType,
    },raw:true
  });

  if (existsUser) {
    throw new Error('vehicle type  already exists with the same type');
  }

  // Create  vehicle_types
   await db.vehicle_types.create({
    vehicle_types : payload.vehicleType
  });

  return true
};

const getvehicleType = async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getvehicleType = await db.vehicle_types.findAll({
    limit,
    offset,
  });
  return getvehicleType;
};


// update User
const updateVehicleType = async (id, payload) => {
  const vehicleType = await db.vehicle_types.findOne({ where: { id } });
  if (!vehicleType) {
    throw new Error('vehicleType not found');
  }
 await db.vehicle_types.update({vehicle_type:payload.vehicleType},{where:{id:id}})
  
  return user;
};

// delete  User
const deleteVehicleType = async (id) => {
  const data = await db.vehicle_types.findOne({ where: { id: id } });
  if (!data) {
    throw new Error('vehicle_type not found');
  }

  // Delete from vehicle_types
  await db.vehicle_types.destroy({ where: { id: id } });

 
  return { message: 'deleted successfully' };
};

module.exports = {
  createVehicleType,
  getvehicleType,
  updateVehicleType,
  deleteVehicleType,
};