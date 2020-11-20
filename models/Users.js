const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    join_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "user"
    },
    avatar: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    newsletter_sub: {
        type: Boolean,
        default: false

    }
}, {collection: "users"})

const User = module.exports = mongoose.model('User', userSchema);