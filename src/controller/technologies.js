//  Te permite accedar a la información del modelo de Links
//const link = require('../model/technologies');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');



const technologies = {
    getTechnologies: async (req,res) => {
        const technologies = await pool.query('SELECT * FROM technologies WHERE user_id= ?', [req.user.id]);
        res.render('technologies/list', { technologies});
    },
    addTechnology: async (req,res) => {
        const { title, level } = req.body;
        const link = {
            title,
            level,
            user_id: req.user.id
        };
        try{
            await pool.query('INSERT INTO technologies set ?', [link]);
            req.flash('success', 'Link saved succesfully');
            res.redirect('/technologies');
        } catch(e) {
            console.log(e);
        }
    },
    deleteTechnology: async (req,res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM technologies WHERE ID =?', [id]);
        req.flash('success', 'technologies Removed succesfully');
        res.redirect('/technologies');
    },
    getTechnology: async (req, res) => {
        const { id } = req.params;
        const technologies = await pool.query('SELECT * FROM technologies WHERE id = ?', [id]);
        console.log(technologies[0]);
        res.render('technologies/edit', {technology: technologies[0]});
    },
    editTechnology: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { title, level } = req.body;
        const newTechnology = {
            title, 
            level,
        };
        await pool.query('UPDATE technologies set ? WHERE id = ?', [newTechnology, id]);
        req.flash('success', 'Technology Updated Successfully');
        res.redirect('/technologies');
    }
}

module.exports = technologies;