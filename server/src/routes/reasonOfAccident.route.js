const express = require('express');
const {reasonOfAccident} = require('../controllers')


const router = express.Router();

router.post('/',  reasonOfAccident.createReasonOfAccident);
router.put('/:id',  reasonOfAccident.updateReasonOfAccident);
router.get('/', reasonOfAccident.getReasonOfAccidents);
router.delete('/:id', reasonOfAccident.deleteReasonOfAccident);
module.exports = router;
