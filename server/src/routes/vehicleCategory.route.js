const express = require('express');
const {VehicleCategory} = require('../controllers')

const router = express.Router();

router.post('/', VehicleCategory.createvehicleCategory);
router.put('/:id',  VehicleCategory.updatevehicleCategory);
router.get('/', VehicleCategory.getvehicleCategorys);
router.delete('/:id', VehicleCategory.deletevehicleCategory);
module.exports = router;
