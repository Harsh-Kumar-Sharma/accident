const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const {userController} = require('../controllers')
const {userValidation} = require('../validations')

const router = express.Router();

router.post('/',validate(userValidation.createUser),  userController.createUser);
router.put('/:id',  userController.updateUser);
router.get('/', userController.getUsers);
router.delete('/:id', userController.deleteUser);
module.exports = router;
