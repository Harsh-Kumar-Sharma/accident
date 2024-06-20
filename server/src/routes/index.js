const express = require('express');
const authRoute = require('./auth.route');
const customersRoute = require('./customers.route');
const licensesRoute = require('./licenses.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/customers', customersRoute);
router.use('/licenses', licensesRoute);

module.exports = router;
