const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accident.controller')

router.post('/', accidentController.insertAccident);
router.post('/create', accidentController.createAccident);
router.post('/getAll/:page', accidentController.getAllAccident);
router.post('/getDashboardData', accidentController.getDashboardData);
router.get('/:id', accidentController.getAccidentById);
router.put('/:id', accidentController.updateAccident);

module.exports = router;
