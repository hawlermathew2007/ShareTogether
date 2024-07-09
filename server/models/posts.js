const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    topic: {
        type: String
    },
    essay: {
        type: String,
        require: true
    },
    datePost: {
        type: Date,
        default: Date.now()
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

module.exports = mongoose.model('Post', postSchema)