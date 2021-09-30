const  mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    address:String,
    password:String
})

module.exports = mongoose.model('User',userschema);