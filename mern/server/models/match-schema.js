const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let matchSchema = new Schema({
    from_email: {
        type: String
    },
    to_email: {
        type: String
    },
    is_match:{
        type: Boolean
    }
}, 
    {
        collection: 'matches'
    })
module.exports = mongoose.model('Matches', matchSchema)