const express = require('express')
const router = express.Router()
const pool = require('../database')
const bcrypt = require('bcryptjs')

// Admin Login Route
router.get('/login', (req,res) => {
    res.render('admin/login', {message: ''})
})

// Admin Login Process
router.post('/login',  async (req,res) => {
   try {
       const { username, password } = req.body
       pool.query('SELECT * FROM Admin_Profile WHERE Username = ?', [username],  async (error, results) => {
           console.log(results.length)
           if( results.length <=0 ){
               console.log("Wrong user or password")
               res.status(401).render('admin/login', {
                   message: 'Username or password is incorrect'
               })
               
           } else if ( !(await bcrypt.compare(password, results[0].Password))) {
               res.status(401).render('admin/login', {
                   message: 'Username or password is incorrect'
               })
           } else {
               res.status(200).redirect('home')
           }

       })
       
   } catch (error) {
       console.log(error)
   }
})

/* Admin Home Route */
router.get('/home', (req,res) => {
    res.render('admin/home')
})


module.exports = router