const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailSchema = new Schema({
    name: {type: String, required: true},   
    email: {type: String, required: true},  
    subject: {type: String, required: true}, 
    messsage: {type: String, required: true}, 
})

module.exports = mongoose.model("Email", emailSchema)