const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {reasonOfAccident} = require('../services')

const createReasonOfAccident = catchAsync(async (req, res) => {
 const data = await reasonOfAccident.createReasonOfAccident(req.body);
  res.status(httpStatus.OK).send(data);
});

// get all users
const getReasonOfAccidents = catchAsync(async (req, res) => {
    const { page } = req.query;
    const getData = await reasonOfAccident.getReasonOfAccident(page?page:1);
    res.status(200).json({
      status: 'success',
      data:getData,
    });
  });
  
 
  
  // update user
  const updateReasonOfAccident = catchAsync(async (req, res) => {
    const updatedReasonOfAccident = await reasonOfAccident.updateReasonOfAccident(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        ReasonOfAccident: updatedReasonOfAccident,
      },
    });
  });
  
  // delete ReasonOfAccident
  const deleteReasonOfAccident = catchAsync(async (req, res) => {
    const ReasonOfAccidentId = req.params.id;
    const deletedReasonOfAccident = await reasonOfAccident.deleteReasonOfAccident(ReasonOfAccidentId);
    res.status(200).json({
      status: 'success',
      data: {
        ReasonOfAccident: deletedReasonOfAccident,
      },
    });
  });



module.exports = {
    createReasonOfAccident,
    getReasonOfAccidents,
    updateReasonOfAccident,
    deleteReasonOfAccident,
};
