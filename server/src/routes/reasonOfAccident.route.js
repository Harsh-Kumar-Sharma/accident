const express = require('express');
const router = express.Router();
const ReasonOfAccidentController = require('../controllers/reasonOfAccident.controller')

router.get('/get',ReasonOfAccidentController.getReasonOfAccident);

module.exports = router;
