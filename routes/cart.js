const express = require('express')
const router = express.Router()

// Import Controllers 
const { getCart } = require('../controller/cart_controller')

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

// Cart Route
router.get('/:username', checkUser, isAuthorized, getCart)

module.exports = router;