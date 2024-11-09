const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const {userController} = require('../controllers')


const router = express.Router();

router.post('/createUser',  userController.createUser);
// router.put('/update/:id',  userController.login);
router.get('/', userController.getUsers);
// router.delete('/', userController.logout);

module.exports = router;
