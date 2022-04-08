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
    age:{
        type: Number
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