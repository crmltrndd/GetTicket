const express = require('express')
const router = express.Router()

// Import Controllers 
const { getPrivacyPolicy } = require('../controller/link_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/', checkUser, getPrivacyPolicy)          // Privacy Policy Route

module.exports = router;