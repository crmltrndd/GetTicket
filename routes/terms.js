const express = require('express')
const router = express.Router()

// Import Controllers 
const { getTerms } = require('../controller/link_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/', checkUser, getTerms)          // Terms Route

module.exports = router;