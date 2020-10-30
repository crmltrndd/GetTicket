const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

const app = express()

/* Load View Engine */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(path.join(__dirname, './public')))       // Set public directory for storing css & images
app.use(express.urlencoded({ extended: false}))                 // Parse URL-encoded bodies (as sent by MTML) To access data in forms 
app.use(express.json())                                         // Parse JSON bodies (as sent by API clients) To make the values grabbing in forms as JSON 


/* Define Routes */
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))

/* Start Server */
app.listen( process.env.PORT, () => {
    console.log("Server started on port 5000")
})