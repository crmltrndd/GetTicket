const express = require('express')
const router = express.Router()

// Import Controllers 
const { getDisclaimer } = require('../controller/link_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/', checkUser, getDisclaimer)                 // Disclaimer Route

module.exports = router;