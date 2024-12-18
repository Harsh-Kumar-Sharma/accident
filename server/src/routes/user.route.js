const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const {userController} = require('../controllers')
const {userValidation} = require('../validations')

const router = express.Router();

router.post('/createUser',validate(userValidation.createUser),  userController.createUser);
router.put('/update/:id',  userController.updateUser);
router.get('/', userController.getUsers);
router.delete('/:id', userController.deleteUser);
router.get('/getRoles',  userController.getAllRoles);
module.exports = router;
