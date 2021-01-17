const express = require('express')
const router = express.Router()

// Import Controllers 
const { getMall } = require('../controller/link_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/', checkUser, getMall)          // Time Square Mall Route

module.exports = router;