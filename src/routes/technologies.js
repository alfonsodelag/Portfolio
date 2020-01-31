const express  = require('express');
const router   = express.Router();

router.get('/technologies', async (req,res) => {
    res.render('../views/technologies/technologies.hbs');
});


module.exports = router;