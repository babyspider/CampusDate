/**
*This document holds the schema for the 
*matches that each user can have
*we use this in storing who matches to who
*and also who doesnt match but is seen
*/
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