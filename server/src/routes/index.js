const express = require('express');
const authRoute = require('./auth.route');
const accidentRoute =require('./accident.route')

const router = express.Router();

router.use('/auth', authRoute);
router.use('/accident', accidentRoute);

module.exports = router;
