const express  = require('express');
const router   = express.Router();

router.get('/about', async (req,res) => {
    res.render('../views/about/about.hbs');
});


module.exports = router;