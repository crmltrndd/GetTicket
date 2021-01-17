const express = require('express')
const router = express.Router()

// Import Controllers 
const { getRegister, postRegister } = require('../controller/register_controller')

// Import Middleware
const { isNotAuthorized,  checkUser } = require('../middleware/user')

router.get('/', checkUser, isNotAuthorized, getRegister)         // Register Route
router.post('/', checkUser, isNotAuthorized, postRegister)       // Register Process Handler

module.exports = router;