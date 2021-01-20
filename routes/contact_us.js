const express = require('express')
const router = express.Router()

// Import Controllers 
const { getContactUs } = require('../controller/contact_us_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

// Contact Us Route
router.get('/', checkUser, getContactUs)

module.exports = router;