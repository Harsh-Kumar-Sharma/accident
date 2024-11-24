const express = require('express');
const {sourceOfInformation} = require('../controllers')


const router = express.Router();

router.post('/',  sourceOfInformation.createSourceOfInformation);
router.put('/:id',  sourceOfInformation.updateSourceOfInformation);
router.get('/', sourceOfInformation.getSourceOfInformations);
router.delete('/:id', sourceOfInformation.deleteSourceOfInformation);
module.exports = router;
