const express = require('express');
const sendEmailRouter = express.Router();
const Email = require("../models/Email");
const nodemailer = require('nodemailer');
//const credentials = require('../config/config');

let transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
}

let transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
    console.log(error);
    } else {
    console.log('Server is ready to take messages');
    }
});

// Add One
sendEmailRouter.post('/', (req, res, next) => {
    console.log('post request got hit')
    console.log(req.body)
    console.log(req.body.message)

    let name = req.body.name
    let email = req.body.email
    let subject = req.body.subject
    let message = req.body.message
    let content = `name: ${name} \n email: ${email} \n message: ${message}`

    let mail = {
        from: name,
        to: 'Infinity.Investments.Team@gmail.com', 
        subject: subject,
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
        res.json({
            msg: 'fail'
        })
        } else {
        res.json({
            msg: 'success'
        })
        }
    })
})

module.exports = sendEmailRouter