const express = require('express')
const router = express.Router()

// Import Controllers 
const { getForgotPassword, postForgotPassword, } = require('../controller/forgot_password_controller')

// Import Middleware
const { isNotAuthorized } = require('../middleware/user')

router.get('/', isNotAuthorized, getForgotPassword)          // Forgot Password Route
router.post('/', isNotAuthorized, postForgotPassword)        // Forgot Password Process

module.exports = router;