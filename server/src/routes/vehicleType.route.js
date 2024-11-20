const express = require('express');
const {vehicleTypeController} = require('../controllers')

const router = express.Router();

router.post('/',  vehicleTypeController.createVehicleType);
router.put('/:id',  vehicleTypeController.updateVehicleType);
router.get('/', vehicleTypeController.getVehicleTypes);
router.delete('/:id', vehicleTypeController.deleteVehicleType);

module.exports = router;
