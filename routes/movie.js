const express = require('express')
const router = express.Router()

// Import Controllers 
const { getMovieDetails } = require('../controller/movie_controller')

// Import Middleware
const { checkUser } = require('../middleware/user')

router.get('/:title', checkUser, getMovieDetails)            // Movie Details Route

module.exports = router;