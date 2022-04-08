/**
*This document holds the schema for the 
*hobbies that each user can have
*we use this in sorting potential matches
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let preferencesSchema = new Schema({
    email: {
        type: String
    },
    anime: {
        type: Boolean
    },
    art: {
        type: Boolean
    },
    cooking: {
        type: Boolean
    },
    reading: {
        type: Boolean
    },
    sports: {
        type: Boolean
    },
    videogames: {
        type: Boolean
    }
}, 
    {
        collection: 'preferences'
    }
    )
module.exports = mongoose.model('Preferences', preferencesSchema)