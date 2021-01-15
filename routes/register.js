const express = require('express')
const router = express.Router()

// Import Controllers 
const { getRegister, postRegister } = require('../controller/register_controller')

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

router.get('/', checkUser, getRegister)         // Register Route
router.post('/', checkUser, postRegister)       // Register Process Handler

module.exports = router;