const express  = require('express');
const router   = express.Router();

router.get('/softskills', async (req,res) => {
    res.render('../views/soft skills/softskills.hbs');
});


module.exports = router;