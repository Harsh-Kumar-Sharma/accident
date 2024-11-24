const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {timeOfDay} = require('../services')

const createTimeOfDay = catchAsync(async (req, res) => {
 const data = await timeOfDay.createTimeOfDay(req.body);
  res.status(httpStatus.OK).send(data);
});

// get all users
const getTimeOfDays = catchAsync(async (req, res) => {
    const { page } = req.query;
    const getData = await timeOfDay.getTimeOfDay(page?page:1);
    res.status(200).json({
      status: 'success',
      data:getData,
    });
  });
  
 
  
  // update user
  const updateTimeOfDay = catchAsync(async (req, res) => {
    const updatedTimeOfDay = await timeOfDay.updateTimeOfDay(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        TimeOfDay: updatedTimeOfDay,
      },
    });
  });
  
  // delete TimeOfDay
  const deleteTimeOfDay = catchAsync(async (req, res) => {
    const TimeOfDayId = req.params.id;
    const deletedTimeOfDay = await timeOfDay.deleteTimeOfDay(TimeOfDayId);
    res.status(200).json({
      status: 'success',
      data: {
        TimeOfDay: deletedTimeOfDay,
      },
    });
  });



module.exports = {
    createTimeOfDay,
    getTimeOfDays,
    updateTimeOfDay,
    deleteTimeOfDay,
};
