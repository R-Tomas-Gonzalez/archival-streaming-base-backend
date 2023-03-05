const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    user_id: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    original_title: {
        type: String,
        required: false
    },
    id: {
        type: Number,
        required: false
    },
    backdrop_path: {
        type: String,
        required: false
    },
    poster_path: {
        type: String,
        required: false
    },
    genre_ids: {
        type: [Number],
        required: false
    },
    release_date: {
        type: String,
        required: false
    },
    overview: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('movie', moviesSchema);