const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const toId = mongoose.Types.ObjectId;

const Movie = require('../models/movie');


// Getting all
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:movie_id', getMovie, (req, res) => {
    res.json(res.movie)
})

// Creating one
router.post('/', async (req, res) => {
    const movie = new Movie({
        user_id: [toId(req.body.user_id)],
        original_title: req.body.original_title,
        movies: req.body.moviei,
        backdrop_path: req.body.backdrop_path,
        poster_path: req.body.poster_path,
        genre_ids: req.body.genre_ids,
        release_date: req.body.release_date,
        overview: req.body.overview,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    })
    try {
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:movie_id', getMovie, async (req, res) => {
    if (req.body.user_id != null) {
        res.movie.user_id = [...res.movie.user_id, req.body.user_id]
    }
    try {
        const updatedMovie = await res.movie.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove()
        res.json({ message: 'Deleted Movie' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMovie(req, res, next) {
    let movie
    try {
        movie = await Movie.findOne({ movie_id: req.params.movie_id })
        if (movie == null) {
            return res.status(404).json({ message: 'Cannot find movie' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.movie = movie
    next()
}

module.exports = router