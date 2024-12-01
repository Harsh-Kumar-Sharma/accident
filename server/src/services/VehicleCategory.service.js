const { db } = require('../models');


const createvehicleCategory= async (payload) => {
  // Pre-validation
  const existsUser = await db.vehicle_category.findOne({
    where: {
        vehicle_type: payload.vehicleType,
    },raw:true
  });

  if (existsUser) {
    throw new Error('vehicle Type already exists with the same name');
  }

  // Create  vehicle_category
   await db.vehicle_category.create({
    vehicle_category : payload.vehicleCategory,
    vehicle_type : payload.vehicleType,
  });

  return true
};

const getvehicleCategory= async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getvehicleCategory= await db.vehicle_category.findAll({
    limit,
    offset,
  });
  return getvehicleCategory;
};


// update User
const updatevehicleCategory= async (id, payload) => {
  const vehicleCategory= await db.vehicle_category.findOne({ where: { id } });
  if (!vehicleCategory) {
    throw new Error('vehicleCategory not found');
  }
 await db.vehicle_category.update({
  vehicle_category : payload.vehicleCategory,
  vehicle_type : payload.vehicleType,
},{where:{id:id}})
  
  return true;
};

// delete  User
const deletevehicleCategory= async (id) => {
  const data = await db.vehicle_category.findOne({ where: { id: id } });
  if (!data) {
    throw new Error('vehicle_category not found');
  }

  // Delete from vehicle_types
  await db.vehicle_category.destroy({ where: { id: id } });

 
  return { message: 'deleted successfully' };
};

module.exports = {
    createvehicleCategory,
  getvehicleCategory,
  updatevehicleCategory,
  deletevehicleCategory,
};