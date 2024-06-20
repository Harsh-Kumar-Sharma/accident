const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const authValidation = require('../validations/auth.validation');
const { licensesController } = require('../controllers');

const router = express.Router();

router.get('/', licensesController.getAllLicenses);
router.post('/', licensesController.createNewLicense);
router.get('/getLicensesForSync', licensesController.getLicensesForSync);
router.get('/updateSyncLicensesStatus/:id', licensesController.updateSyncLicensesStatus);

module.exports = router;
