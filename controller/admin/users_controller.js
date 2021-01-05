const pool = require('../../config/database')
const bcrypt = require('bcryptjs')


// Display list of all users.
exports.getUsers = (req, res) => {
    pool.query('SELECT * FROM Admin_Profile', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/users', {
                ...makeObjectParameter('GetTicket Admin | Users', 'admin_home.css', req.user.username, req.user.role),
                id: req.user.id,
                users: results
            })
        }
    })
}


// Display add user form on GET.
exports.getAddUser = (req, res) => {
    res.render('admin/users/add_user', {
        ...makeObjectParameter('GetTicket Admin | Add User', 'admin_home.css', req.user.username, req.user.role),
    })
}


// Handle add user on POST.
exports.postAddUser = (req, res) => {
    const { inputName, inputUsername, inputPassword, inputEmail, inputContact, inputBirthdate, inputAddress, inputRole } = req.body
    // Check if email already exist
    pool.query('SELECT Email FROM Admin_Profile WHERE Email = ?', [inputEmail], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            if (results.length > 0) {
                req.flash('error', 'The email is already in use')
                res.status(403).render('admin/users/add_user', {
                    ...makeObjectParameter('GetTicket Admin | Add User', 'admin_home.css', req.user.username, req.user.role),
                    inputName, inputUsername, inputPassword, inputEmail, inputContact, inputBirthdate, inputAddress, inputRole
                })
            } else {
                // Continue - Check if email already exist
                pool.query('SELECT Username FROM Admin_Profile WHERE Username = ?', [inputUsername], async (error, results) => {
                    if (error) {
                        console.error(error)
                    } else {
                        if (results.length > 0) {
                            req.flash('error', 'The username is already in use')
                            res.status(403).render('admin/users/add_user', {
                                ...makeObjectParameter('GetTicket Admin | Add User', 'admin_home.css', req.user.username, req.user.role),
                                inputName, inputUsername, inputPassword, inputEmail, inputContact, inputBirthdate, inputAddress, inputRole
                            })
                        } else {
                            // Continue - Add the user in the database
                            const password = await bcrypt.hash(inputPassword, 10)
                            const date = new Date()//.toUTCString()
                            const status = 1
                            pool.query('INSERT INTO Admin_Profile SET ? ', { Username: inputUsername, Email: inputEmail, Password: password, Role: inputRole, Name: inputName, Phone: inputContact, Birthday: inputBirthdate, Address: inputAddress, Registered: date, Status: status }, (error, results) => {
                                if (error) {
                                    req.flash('error', 'There\'s problem in adding user.')
                                    res.status(401).redirect('/admin/users/')
                                } else {
                                    res.status(200).redirect('/admin/users/')
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}


// Handle user status update on POST.
exports.postUserStatusUpdate = (req, res) => {
    let status;
    if (req.body.statusValue == '1') {
        status = 0
    } else if (req.body.statusValue == '0') {
        status = 1
    } else {
        req.flash('error', 'Invalid Status!')
        res.status(400).redirect('/admin/users')
        return
    }

    pool.query('UPDATE Admin_Profile SET Status = ? WHERE ID = ?', [status, req.body.userId], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.redirect('/admin/users')
        }
    })
}

/*-------- Functions --------*/

// Constructor for repetitive parameters
function makeObjectParameter(pageTitle, pageStyle, userName, userRole) {
    const object = {
        title: pageTitle,
        css: pageStyle,
        username: userName,
        role: userRole,
    }
    return object;
}