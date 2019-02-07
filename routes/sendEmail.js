const express = require('express')
const sendEmailRouter = express.Router()
const Email = require("../models/Email")

//  Need to create email model  //

// Add One
sendEmailRouter.post('/', (req, res, next) => {
    console.log('post request got hit')
    const newEmail = new Email(req.body)
    newEmail.save((err, email) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(email)
    })
})


module.exports = sendEmailRouter