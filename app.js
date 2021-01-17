const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env'})
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()

// Call for Passport Configuration
const initializePassport = require('./config/passport')
initializePassport(passport);

// Load View Engine 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use(express.static(path.join(__dirname, './public')))       // Set public directory for storing css & images
app.use(express.urlencoded({ extended: false}))                 // Parse URL-encoded bodies (as sent by MTML) To access data in forms 
app.use(express.json())                                         // Parse JSON bodies (as sent by API clients) To make the values grabbing in forms as JSON 

// In order to set cookies in browser
app.use(cookieParser())

// In order to upload file
app.use(fileUpload())

// In order to flash messages
app.use(flash())

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,         // secret key for the session
    resave: false,                              // don't save if nothing is change
    saveUninitialized: false                    // don't save if empty value
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// To override method
app.use(methodOverride('_method'))

// Define Routes 
app.use('/time_square_mall', require('./routes/time_square_mall'))
app.use('/terms', require('./routes/terms'))
app.use('/register', require('./routes/register'))
app.use('/reset_password', require('./routes/reset_password'))
app.use('/privacy_policy', require('./routes/privacy_policy'))
app.use('/movie', require('./routes/movie'))
app.use('/login', require('./routes/login'))
app.use('/link', require('./routes/link'))
app.use('/forgot_password', require('./routes/forgot_password'))
app.use('/disclaimer', require('./routes/disclaimer'))
app.use('/customer_service', require('./routes/customer_service'))
app.use('/contact_us', require('./routes/contact_us'))
app.use('/cart', require('./routes/cart'))
app.use('/account', require('./routes/account'))
app.use('/admin', require('./routes/admin'))
app.use('/', require('./routes/index'))
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page not found',
        css: '404_Error.css'
    })
})

// Start Server
app.listen( process.env.PORT, () => {
    console.log("Server started on port 5000")
})