const express = require('express')
const router = express.Router()

// Import Controllers 
const { getHome } = require('../controller/index_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

// Home Route
router.get('/', checkUser, getHome)

module.exports = router;