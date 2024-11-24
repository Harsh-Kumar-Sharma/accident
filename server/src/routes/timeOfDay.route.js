const express = require('express');
const {timeOfDays} = require('../controllers')


const router = express.Router();

router.post('/',  timeOfDays.createTimeOfDay);
router.put('/:id',  timeOfDays.updateTimeOfDay);
router.get('/', timeOfDays.getTimeOfDays);
router.delete('/:id', timeOfDays.deleteTimeOfDay);
module.exports = router;
