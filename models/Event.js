const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type:String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {collection: "liveshows"});

const Event = module.exports = mongoose.model('Event', eventSchema);