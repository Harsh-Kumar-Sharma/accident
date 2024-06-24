const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accident.controller')

router.post('/', accidentController.insertAccident);

module.exports = router;
