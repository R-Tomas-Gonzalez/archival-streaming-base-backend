const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const toId = mongoose.Types.ObjectId;

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

module.exports = router;