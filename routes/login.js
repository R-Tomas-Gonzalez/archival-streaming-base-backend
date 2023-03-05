const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.json({
            user: req.session.user,
            logged_in: req.session.logged_in
        })
    } else {
        res.json({
            logged_in: false
        })
    }
})

router.post('/', async (req, res) => {
    if (req.body.id) {
        let userId = req.body.id;

        let user = await User.findById(userId);

        if (user) {
            req.session.user = {
                _id: user._id,
                name: user.user_metadata.first_name,
                email: user.email
            };
            req.session.logged_in = true;
            res.json({
                user: req.session.user,
                logged_in: req.session.logged_in
            })
        } else {
            req.session.logged_in = false;
            res.json({
                logged_in: req.session.logged_in
            })
        }
    }
    // console.log(req.session)
});

module.exports = router;