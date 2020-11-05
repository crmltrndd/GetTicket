const LocalStrategy = require('passport-local').Strategy
const pool = require('./database')
const bcrypt = require('bcryptjs')

// Set up Passport Configuration
function initialize(passport){
    
    // To authenticate user's credentials
    const authenticateUser = (username, password, done) => {
        try {
            pool.query('SELECT * FROM Admin_Profile WHERE Username = ?', [username], async (error, results) => {
                if (results.length <=0 ){
                    return done(null, false, {message: 'Invalid username or password'})
                }
                else if (results[0].Status == 0) {
                    return done(null, false, {message: 'Invalid username or password'})
                }
                else if (await bcrypt.compare(password, results[0].Password)) {
                    const user = { id: results[0].ID, username: results[0].Username, role: results[0].Role, status: results[0].Status}
                    return done(null, user)
                } 
                else {
                    return done(null, false, {message: 'Invalid username or password'})
                }
            })
        } catch (error) {
            return done(error)
        }
    }

    // Local Strategy
    passport.use(new LocalStrategy( {}, authenticateUser ))

    // Serialize user to the session
    passport.serializeUser((user, done) => { 
        done(null, user.id) 
    })

    // Deserialize user that match the given id 
    passport.deserializeUser((id, done) => {
        pool.query('SELECT * FROM Admin_Profile WHERE ID = ?', [id], (error, results) => {
            if (error) throw error
            const user = { id: results[0].ID, username: results[0].Username, role: results[0].Role}
            return done(null, user)
        })
    })
}

module.exports = initialize