const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        default: null
    },
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
        default: () => {
            const now = new Date(Date.now());
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        }
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
    objectOfContactLink : {
        type: Object, 
        default: {
            facebook: null,
            instagram: null,
            reddit: null,
            discord: null,
            github: null,
        }
    }
})

module.exports = mongoose.model('User', userSchema)