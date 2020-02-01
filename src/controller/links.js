//  Te permite accedar a la información del modelo de Links
const link = require('../model/links');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');



const links = {
    getLinks: async (req,res) => {
        const links = await pool.query('SELECT * FROM links WHERE user_id= ?', [req.user.id]);
        res.render('links/list', { links});
    },
    addLink: async (req,res) => {
        const { title, url, description } = req.body;
        const link = {
            title,
            url,
            description,
            user_id: req.user.id
        };
        try{
            await pool.query('INSERT INTO links set ?', [link]);
            req.flash('success', 'Link saved succesfully');
            res.redirect('/links');
        } catch(e) {
            console.log(e);
        }
    },
    deleteLink: async (req,res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM links WHERE ID =?', [id]);
        req.flash('success', 'Links Removed succesfully');
        res.redirect('/links');
    },
    getLink: async (req, res) => {
        const { id } = req.params;
        const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
        console.log(links[0]);
        res.render('links/edit', {link: links[0]});
    },
    editLink: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { title, description, url } = req.body;
        const newLink = {
            title, 
            description,
            url
        };
        await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
        req.flash('success', 'Link Updated Successfully');
        res.redirect('/links');
    }
}

module.exports = links;