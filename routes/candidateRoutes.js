const express = require('express');

const candidateController = require('./../controllers/candidateController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', candidateController.page);
router.post('/chosed', authController.protect, candidateController.chosed);
router.get('/loginpage', candidateController.loginpage);
router.get('/me', authController.protect, candidateController.getAccount);

router.post('/submit-user-data', candidateController.updateUserData);

//get which one was chosed
module.exports = router;
