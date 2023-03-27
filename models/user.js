const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    user_metadata: {
        first_name: {
            type: String,
            required: false
        }
    },
    email: {
        type: String,
        required: false
    },
    movies: {
        type: Array,
        required: false
    },
    games: {
        type: Array,
        required: false
    },
    photos: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('user', userSchema);