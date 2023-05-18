const { Router } = require('express');
const { userSignup, userLogin, getUserDetails } = require('../controller/userController');
const { userJWT } = require('../middleware/auth');
const router = Router();

router.post('/api/auth/signup', userSignup)
router.post('/api/auth/login', userLogin)
router.post('/profile', userJWT, getUserDetails)

module.exports = router;