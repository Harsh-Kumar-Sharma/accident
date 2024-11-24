const { db } = require('../models');


const createReasonOfAccident = async (payload) => {
  // Pre-validation
  const existsUser = await db.reasons_of_accidents.findOne({
    where: {
        reasons_of_accidents: payload.reasonOfAccident,
    },raw:true
  });

  if (existsUser) {
    throw new Error('Reasons of accidents already exists with the same name');
  }

  // Create  vehicle_types
   await db.reasons_of_accidents.create({
    reasons_of_accidents : payload.reasonOfAccident
  });

  return true
};

const getReasonOfAccident = async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getReasonOfAccident = await db.reasons_of_accidents.findAll({
    limit,
    offset,
  });
  return getReasonOfAccident;
};


// update User
const updateReasonOfAccident = async (id, payload) => {
  const ReasonOfAccident = await db.reasons_of_accidents.findOne({ where: { id } });
  if (!ReasonOfAccident) {
    throw new Error('ReasonOfAccident not found');
  }
 await db.reasons_of_accidents.update({reasons_of_accidents:payload.reasonOfAccident},{where:{id:id}})
  
  return true;
};

// delete  User
const deleteReasonOfAccident = async (id) => {
  const data = await db.reasons_of_accidents.findOne({ where: { id: id } });
  if (!data) {
    throw new Error('reasons_of_accidents not found');
  }

  // Delete from vehicle_types
  await db.reasons_of_accidents.destroy({ where: { id: id } });

 
  return { message: 'deleted successfully' };
};

module.exports = {
  createReasonOfAccident,
  getReasonOfAccident,
  updateReasonOfAccident,
  deleteReasonOfAccident,
};