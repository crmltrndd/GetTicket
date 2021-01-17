const express = require('express')
const router = express.Router()

// Import Controllers 
const { getResetPassword, postResetPassword, getResetPasswordForm } = require('../controller/reset_password_controller')

// Import Middleware
const { isNotAuthorized } = require('../middleware/user')

router.get('/', isNotAuthorized, getResetPassword)                   // Reset Password Redirect Route
router.post('/', isNotAuthorized, postResetPassword)                 // Reset Password Process Handler
router.get('/:id/:token', isNotAuthorized, getResetPasswordForm)     // Reset Password Form Route

module.exports = router;
