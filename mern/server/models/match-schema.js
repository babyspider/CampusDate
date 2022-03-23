const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    from_email: {
        type:   String
    },
    to_email: {
        type: String
    },
    is_match:{
        type: Boolean
    }
}, {
        collection: 'matches'
    })
module.exports = mongoose.model('Matches', userSchema)