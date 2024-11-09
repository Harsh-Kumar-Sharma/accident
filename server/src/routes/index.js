const express = require('express');
const authRoute = require('./auth.route');
const accidentRoute =require('./accident.route');
const reasonOfAccident = require('./reasonOfAccident.route');
const locationZoneRoute = require('./locationZone.route');
const userRoute = require('./user.route');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/accident', accidentRoute);
router.use('/reason',reasonOfAccident);
router.use('/location/zone',locationZoneRoute);
router.use('/user',userRoute);

module.exports = router;
