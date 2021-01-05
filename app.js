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
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page not found',
        css: '/404_Error.css'
    })
})

// Start Server
app.listen( process.env.PORT, () => {
    console.log("Server started on port 5000")
})