const { db } = require('../models');


const createSourceOfInformation = async (payload) => {
  // Pre-validation
  const existsUser = await db.source_of_information.findOne({
    where: {
        source_of_information: payload.sourceOfInformation,
    },raw:true
  });

  if (existsUser) {
    throw new Error('Reasons of accidents already exists with the same name');
  }

  // Create  vehicle_types
   await db.source_of_information.create({
    source_of_information : payload.sourceOfInformation
  });

  return true
};

const getSourceOfInformation = async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getSourceOfInformation = await db.source_of_information.findAll({
    limit,
    offset,
  });
  return getSourceOfInformation;
};


// update User
const updateSourceOfInformation = async (id, payload) => {
  const SourceOfInformation = await db.source_of_information.findOne({ where: { id } });
  if (!SourceOfInformation) {
    throw new Error('SourceOfInformation not found');
  }
 await db.source_of_information.update({source_of_information:payload.sourceOfInformation},{where:{id:id}})
  
  return true;
};

// delete  User
const deleteSourceOfInformation = async (id) => {
  const data = await db.source_of_information.findOne({ where: { id: id } });
  if (!data) {
    throw new Error('reasons_of_accidents not found');
  }

  // Delete from vehicle_types
  await db.source_of_information.destroy({ where: { id: id } });

 
  return { message: 'deleted successfully' };
};

module.exports = {
  createSourceOfInformation,
  getSourceOfInformation,
  updateSourceOfInformation,
  deleteSourceOfInformation,
};