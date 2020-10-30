const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ path: './.env'})

/* Create connection */
const pool = mysql.createPool({
    host        : process.env.HOST,
    user        : process.env.USER,
    password    : process.env.PASSWORD,
    database    : process.env.DATABASE,
    connectionLimit: 10
})

/* Check connection */
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) {
        console.log("MySQL status: " + connection.state)
        connection.release()
    } 
    return
})


module.exports = pool