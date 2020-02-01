const express  = require('express');
const router   = express.Router();

router.get('/contact', async (req,res) => {
    res.render('../views/contact/contact.hbs');
    console.log(req.body);
    
});


module.exports = router;