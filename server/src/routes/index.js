const express = require('express');
const authRoute = require('./auth.route');
const accidentRoute =require('./accident.route');
const reasonOfAccident = require('./reasonOfAccident.route');
const locationZoneRoute = require('./locationZone.route');
const userRoute = require('./user.route');
const router = express.Router();
const sourceOfInformationRoute = require('./sourceOfInformation.route');
const timeOfDayRoute = require('./timeOfDay.route');
const vehicleCategoryRoute = require('./vehicleCategory.route');
const vehicleTypeRoute = require('./vehicleType.route');

router.use('/auth', authRoute);
router.use('/accident', accidentRoute);
router.use('/reason',reasonOfAccident);
router.use('/location/zone',locationZoneRoute);
router.use('/user',userRoute);
router.use('/sourceOfInformation',sourceOfInformationRoute);
router.use('/timeOfDayRoute',timeOfDayRoute);
router.use('/vehicleCategory',vehicleCategoryRoute);
router.use('/vehicleType',vehicleTypeRoute);

module.exports = router;
