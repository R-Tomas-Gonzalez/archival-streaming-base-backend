const express = require('express');
const router = express.Router();

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
router.get('/:id', getMovie, (req, res) => {
    res.json(res.movie)
})

// Creating one
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await movie.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getMovie, async (req, res) => {
    if (req.body.name != null) {
        res.movie.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.movie.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.movie.save()
        res.json(updatedSubscriber)
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
        movie = await Movie.findById(req.params.id)
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