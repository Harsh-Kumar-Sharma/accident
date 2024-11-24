const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {sourceOfInformation} = require('../services')

const createSourceOfInformation = catchAsync(async (req, res) => {
 const data = await sourceOfInformation.createSourceOfInformation(req.body);
  res.status(httpStatus.OK).send(data);
});

// get all users
const getSourceOfInformations = catchAsync(async (req, res) => {
    const { page } = req.query;
    const getData = await sourceOfInformation.getSourceOfInformation(page?page:1);
    res.status(200).json({
      status: 'success',
      data:getData,
    });
  });
  
 
  
  // update user
  const updateSourceOfInformation = catchAsync(async (req, res) => {
    const updatedSourceOfInformation = await sourceOfInformation.updateSourceOfInformation(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        SourceOfInformation: updatedSourceOfInformation,
      },
    });
  });
  
  // delete SourceOfInformation
  const deleteSourceOfInformation = catchAsync(async (req, res) => {
    const SourceOfInformationId = req.params.id;
    const deletedSourceOfInformation = await sourceOfInformation.deleteSourceOfInformation(SourceOfInformationId);
    res.status(200).json({
      status: 'success',
      data: {
        SourceOfInformation: deletedSourceOfInformation,
      },
    });
  });



module.exports = {
    createSourceOfInformation,
    getSourceOfInformations,
    updateSourceOfInformation,
    deleteSourceOfInformation,
};
