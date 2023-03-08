const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    console.log(req)
    req.session.destroy();
    res.clearCookie('connect.sid')
    return res.json({
        msg: 'logging you out'
    })
});

module.exports = router;