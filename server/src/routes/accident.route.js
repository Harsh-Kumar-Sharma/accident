const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accident.controller')

router.post('/', accidentController.insertAccident);
router.post('/create', accidentController.createAccident);
router.post('/getAll/:page', accidentController.getAllAccident);

module.exports = router;
