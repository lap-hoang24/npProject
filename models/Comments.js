const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user: {
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        user_avatar: {
            type: String,
            required: true
        },
        user_color: {
            type: String,
            required: true
        }
    },
    content: {
        type: String,
        required: true
    },
    liveshows_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = module.exports = mongoose.model('Comment', commentSchema);