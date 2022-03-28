const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name:{
        type: String
    },
    dob:{
        type: Date
    },
    pictures:{
        type: Array
    },
    desc:{
        type: String
    }
}, {
        collection: 'users'
    })
module.exports = mongoose.model('Users', userSchema)