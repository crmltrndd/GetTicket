const express = require('express')
const router = express.Router()

// Import Controllers 
const { getForgotPassword, postForgotPassword, } = require('../controller/forgot_password_controller')

router.get('/', getForgotPassword)          // Forgot Password Route
router.post('/', postForgotPassword)        // Forgot Password Process

module.exports = router;