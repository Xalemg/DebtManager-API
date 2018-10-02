const express = require('express');
const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');
const checkUser = require('../middleware/check-user');


const router = express.Router();

router.post('/signup', UserController.create_user);
router.post('/login', UserController.login);
router.delete('/delete/:userId',checkAuth,checkUser , UserController.delete_account);
router.patch('/update/:userId', checkAuth, checkUser , UserController.update_user);


module.exports = router;