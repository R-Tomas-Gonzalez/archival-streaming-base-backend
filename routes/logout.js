const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    req.session.destroy(null);
    res.clearCookie('connect.sid')
    return res.json({
        msg: 'logging you out'
    })
});

module.exports = router;