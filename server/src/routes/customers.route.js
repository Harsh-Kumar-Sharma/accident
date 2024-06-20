const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const authValidation = require('../validations/auth.validation');
const { customersController } = require('../controllers');

const router = express.Router();

router.get('/', customersController.getAllCustomers);
router.post('/', customersController.createNewCustomer);
router.get('/:id', customersController.getCustomerById);

module.exports = router;
