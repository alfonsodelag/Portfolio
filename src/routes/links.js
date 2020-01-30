const express = require('express');
const router  = express.Router();

const pool = require('../database.js');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req,res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    try{
        await pool.query('INSERT INTO links set ?', [newLink]);
        res.redirect('/links');
    } catch(e) {
        console.log(e);
    }
});

router.get('/', async (req,res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links});
});

router.get('/delete/:id', async (req,res) => {
    const { id } = req.params;
    pool.query('DELETE FROM links WHERE ID =?', [id]);
    res.redirect('/links');
});

module.exports = router;

