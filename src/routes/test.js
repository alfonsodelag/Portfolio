const express  = require('express');
const router   = express.Router();

router.get('/test', async (req,res) => {
    res.render('../views/experience/experience');
});


module.exports = router;