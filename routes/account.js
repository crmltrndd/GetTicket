const express = require('express')
const router = express.Router()

// Import Controllers 
const { getMyAccount, getTransactions, getEditProfile, postEditProfile } = require('../controller/account_controller')

// Import Middleware
const { checkUser, isAuthorized } = require('../middleware/user')

router.get('/:username/profile', checkUser, isAuthorized, getMyAccount)             // My Account Route
router.get('/:username/transactions', checkUser, isAuthorized, getTransactions)     // Transaction History Route
router.get('/:username/edit_profile', checkUser, isAuthorized, getEditProfile)      // Edit Profile Route
router.post('/:username/edit_profile', checkUser, isAuthorized, postEditProfile)    // Edit Profile Process

module.exports = router;