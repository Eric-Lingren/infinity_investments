const express = require('express');
const sendEmailRouter = express.Router();
const Email = require("../models/Email");
const nodemailer = require('nodemailer');
const credentials = require('../config/config');

let transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: credentials.USER,
        pass: credentials.PASS
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
    var name = req.body.name
    var email = req.body.email
    let subject = req.body.subject
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message}`

    var mail = {
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

    // const newEmail = new Email(req.body)
    // newEmail.save((err, email) => {
    //     if (err) {
    //         res.status(500)
    //         return next(err)
    //     }
    //     return res.status(201).send(email)
    // })
})


module.exports = sendEmailRouter