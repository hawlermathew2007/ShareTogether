const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    authorName: {
        type: String,
        require: true
    },
    liked: {
        type: Number,
        default: 0
    },
    copyed: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Message', postSchema)