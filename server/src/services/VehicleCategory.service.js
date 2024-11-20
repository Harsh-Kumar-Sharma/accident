const { db } = require('../models');


const createvehicleCategory= async (payload) => {
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

const getvehicleCategory= async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getvehicleCategory= await db.vehicle_types.findAll({
    limit,
    offset,
  });
  return getvehicleType;
};


// update User
const updatevehicleCategory= async (id, payload) => {
  const vehicleCategory= await db.vehicle_types.findOne({ where: { id } });
  if (!vehicleType) {
    throw new Error('vehicleCategorynot found');
  }
 await db.vehicle_types.update({vehicle_type:payload.vehicleType},{where:{id:id}})
  
  return user;
};

// delete  User
const deletevehicleCategory= async (id) => {
  const data = await db.vehicle_types.findOne({ where: { id: id } });
  if (!data) {
    throw new Error('vehicle_type not found');
  }

  // Delete from vehicle_types
  await db.vehicle_types.destroy({ where: { id: id } });

 
  return { message: 'deleted successfully' };
};

module.exports = {
    createvehicleCategory,
  getvehicleCategory,
  updatevehicleCategory,
  deletevehicleCategory,
};