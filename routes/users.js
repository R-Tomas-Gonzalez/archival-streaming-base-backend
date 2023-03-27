const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user');


router.get('/', async (req, res) => {
    try {
        const originalUsers = await User.find();
        const users = originalUsers.map((user) => {
            return {
                _id: user._id,
                name: user.user_metadata.first_name,
                email: user.email
            }
        })
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:_id', getUser, (req, res) => {
    res.json(res.user)
})

router.patch('/:_id/movies', getUser, async (req, res) => {
    if (req.body.movie != null) {
        res.user.movies = [...res.user.movies, req.body.movie];
    }

    if (req.body.movies != null) {
        res.user.movies = req.body.movies;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:_id/games', getUser, async (req, res) => {
    if (req.body.game != null) {
        res.user.games = [...res.user.games, req.body.game];
    }

    if (req.body.games != null) {
        res.user.games = req.body.games;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
})


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findOne({ _id: req.params._id })
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router;