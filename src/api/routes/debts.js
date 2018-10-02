const express = require('express');
const checkAuth = require('../middleware/check-auth');
const checkUser = require('../middleware/check-user');
const debtController = require('../controllers/debts');

const router = express.Router();

router.post('/',checkAuth, debtController.add_debt);
router.get('/:debtId', checkAuth, checkUser, debtController.get_debt);
router.delete('/:debtId', checkAuth, checkUser, debtController.delete_debt);
router.patch('/:debtId', checkAuth, checkUser, debtController.update_debt);
router.get('/', checkAuth, debtController.get_debts);


module.exports = router;