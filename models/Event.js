const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    users_was_there: {
        type: Array,
        require: true
    }
}, { collection: "liveshows" });

const Event = module.exports = mongoose.model('Event', eventSchema);