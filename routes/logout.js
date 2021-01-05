const express = require('express')
const router = express.Router()

const { isAuthorized, checkUser } = require('../middleware/user')

// Logout Route
router.get('/', checkUser, isAuthorized, (req, res) => {
    res.cookie('access', '', {maxAge: 1} )
    res.redirect('/')
})

module.exports = router;