const express = require('express')
const router = express.Router()

// Import Controllers 
const { getCustomerService, getDisclaimer, getMall, getPrivacyPolicy, getTerms } = require('../controller/link_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/customer_service', checkUser, getCustomerService)      // Customer Service Route
router.get('/disclaimer', checkUser, getDisclaimer)                 // Disclaimer Route
router.get('/time_square_mall', checkUser, getMall)                 // Mall Route
router.get('/privacy_policy', checkUser, getPrivacyPolicy)          // Privacy Policy Route
router.get('/terms', checkUser, getTerms)                           // Terms Route

module.exports = router;