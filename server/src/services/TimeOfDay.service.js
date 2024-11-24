const { db } = require('../models');


const createTimeOfDay= async (payload) => {
  // Pre-validation
  const existsUser = await db.time_of_day.findOne({
    where: {
        time_of_day: payload.timeOfDay,
    },raw:true
  });

  if (existsUser) {
    throw new Error('TimeOfDay already exists with the same name');
  }

  // Create  vehicle_category
   await db.time_of_day.create({
    time_of_day : payload.timeOfDay,
    start_time : convertTo24HourFormat(payload.startTime),
    end_time : convertTo24HourFormat(payload.endTime),
  });

  return true
};

const getTimeOfDay= async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getTimeOfDay= await db.time_of_day.findAll({
    limit,
    offset,
  });
  return getTimeOfDay;
};


// update User
const updateTimeOfDay= async (id, payload) => {
  const TimeOfDay= await db.time_of_day.findOne({ where: { id } });
  if (!TimeOfDay) {
    throw new Error('TimeOfDay not found');
  }
 await db.time_of_day.update({
    time_of_day : payload.timeOfDay,
    start_time : convertTo24HourFormat(payload.startTime),
    end_time : convertTo24HourFormat(payload.endTime),
},{where:{id:id}})
  
  return true;
};

// delete  User
const deleteTimeOfDay= async (id) => {
  const data = await db.time_of_day.findOne({ where: { id: id } });
  if (!data) {
    throw new Error('TimeOfDay not found');
  }

  // Delete from vehicle_types
  await db.time_of_day.destroy({ where: { id: id } });

 
  return { message: 'deleted successfully' };
};


function convertTo24HourFormat(timeString) {
  const [time, modifier] = timeString.split(' '); // Separate time and AM/PM part
  let [hours, minutes, seconds] = time.split(':'); // Split the time into hours, minutes, and seconds
  
  // Convert hours to a 24-hour format
  if (modifier === "AM") {
    if (hours === "12") {
      hours = "00"; // 12 AM is midnight, which is 00:00:00
    }
  } else if (modifier === "PM") {
    if (hours !== "12") {
      hours = (parseInt(hours) + 12).toString(); // Add 12 to PM hours (except 12 PM)
    }
  }

  // Return the formatted time
  return `${hours}:${minutes}:${seconds}`;
}

module.exports = {
    createTimeOfDay,
  getTimeOfDay,
  updateTimeOfDay,
  deleteTimeOfDay,
  convertTo24HourFormat
};