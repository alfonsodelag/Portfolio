const express  = require('express');
const router   = express.Router();

router.get('/experience', async (req,res) => {
    res.render('../views/experience/experience');
});


module.exports = router;