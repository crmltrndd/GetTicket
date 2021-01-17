const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Display MyAccount - Profile Page on GET
exports.getMyAccount = (req, res) => {
    res.render('account', {
        title: 'GetTicket | My Account',
        css: 'user_account.css',
        active: 'profile',
    })
}


// Display Transaction History Page on GET
exports.getTransactions = (req, res) => {
    res.render('account', {
        title: 'GetTicket | My Account',
        css: 'user_account.css',
        active: 'transactions',
    })
}


// Display Edit Profile Form on GET
exports.getEditProfile = (req, res) => {
    pool.query('SELECT Username, Email, Birthday FROM User_Profile', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            // Passing list of usernames for checking if Username and Email already exist
            let birthday
            let usernameList = []
            let emailList = []
            results.forEach(user => {
                if (user.Username === req.params.username) {
                    birthday = formatDate(results[0].Birthday)
                } else {
                    usernameList.push(user.Username)
                    emailList.push(user.Email)
                }
            })
            // Render Edit Profile Page
            res.render('account/edit_profile', {
                title: 'GetTicket | Edit Profile',
                css: 'user_edit_profile.css',
                usernames: usernameList,
                emails: emailList,
                birthday: birthday,
            })
        }
    })
}


// Handle  Edit Profile on POST 
exports.postEditProfile = async (req, res) => {
    const { username, email, newPassword, firstname, lastname, contact, birthdate, address } = req.body
    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // SQL Statement & SQL Parameter
    const sqlStatement = ( newPassword != '') ? 'UPDATE User_Profile SET Username = ?, Email = ?, Password = ?, Fname = ?, Lname = ?, Contact = ?, Birthday = ?, Address = ? WHERE Username = ?' : 'UPDATE User_Profile SET Username = ?, Email = ?, Fname = ?, Lname = ?, Contact = ?, Birthday = ?, Address = ? WHERE Username = ?'
    const sqlParameter = ( newPassword != '') ? [username, email, hashedPassword, firstname, lastname, contact, birthdate, address, req.params.username] : [username, email, firstname, lastname, contact, birthdate, address, req.params.username]
    
    // Update user profile in the database 'including' password
    pool.query( sqlStatement, sqlParameter, (err) => {
        if (err) {
            console.error(err)
        }
        const accessToken = createToken(username)            
        res.cookie('access', accessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000 })
        res.status(200).redirect(`/account/${username}/profile`)
    })
}


/*---------- Functions ---------------*/

// Format Date by DAY / MONTH / YEAR
function formatDate(unformattedDate) {
    let date = new Date(unformattedDate)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) month = '0' + month.toString()
    if (day < 10) day = '0' + day.toString()
    return day + "/" + month + "/" + year
}

// Create JWT token for authentication (login user)
function createToken(username) {
    const user = { username }
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION // 3days = 3 * 24 * 60 * 60
    })
}