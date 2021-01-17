const express = require('express')
const router = express.Router()

// Import Controllers 
const { getCustomerService } = require('../controller/link_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/', checkUser, getCustomerService)          // Customer Service Route

module.exports = router;