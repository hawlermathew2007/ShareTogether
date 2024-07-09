const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    introduction: {
        type: String
    },
    birthday: {
        type: String,
        required: true
    },
    dateCreateAcc: {
        type: Date,
        default: Date.now()
    },
    introduction: {
        type: String
    },
    numsOfFollowers: {
        type: Number,
        default: 0
    },
    listOfFavoriteTag: {
        type: Array,
        default: []
    },
    listOfFollowed: {
        type: Array,
        default: []
    },
    listOfTodos: {
        type: Array,
        default: []
    },
    listOfliked: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('User', userSchema)