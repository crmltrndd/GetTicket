const express = require('express')
const router = express.Router()

// Import Controllers 
const { getResetPassword, postResetPassword, getResetPasswordForm } = require('../controller/reset_password_controller')

router.get('/', getResetPassword)                   // Reset Password Redirect Route
router.post('/', postResetPassword)                 // Reset Password Process Handler
router.get('/:id/:token', getResetPasswordForm)     // Reset Password Form Route

module.exports = router;
