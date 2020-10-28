const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    liveshows_id: {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = module.exports = mongoose.model('Comment', commentSchema);