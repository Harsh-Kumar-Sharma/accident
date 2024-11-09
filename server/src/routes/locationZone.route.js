const express = require('express');
const router = express.Router();
const locationZoneController = require('../controllers/locationZone.controller')

router.get('/get',locationZoneController.getLocationZone);

module.exports = router;
