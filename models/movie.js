const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    originalTitle: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('movie', moviesSchema);