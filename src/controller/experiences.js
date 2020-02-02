//  Te permite accedar a la información del modelo de Links
//const link = require('../model/experiences');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');


const experiences = {
    getExperiences: async (req,res) => {
        const experiences = await pool.query('SELECT * FROM experiences WHERE user_id= ?', [req.user.id]);
        res.render('experiences/list', { experiences });
    },
    addExperience: async (req,res) => {
        const { title, Year, Description } = req.body;
        const experience = {
            title,
            Year,
            Description,
            user_id: req.user.id
        };
        try{
            await pool.query('INSERT INTO experiences set ?', [experience]);
            req.flash('success', 'Link saved succesfully');
            res.redirect('/experiences');
        } catch(e) {
            console.log(e);
        }
    },
    deleteExperience: async (req,res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM experiences WHERE ID =?', [id]);
        req.flash('success', 'experiences Removed succesfully');
        res.redirect('/experiences');
    },
    getExperience: async (req, res) => {
        const { id } = req.params;
        const experience = await pool.query('SELECT * FROM experiences WHERE id = ?', [id]);
        console.log(experience[0]);
        res.render('experiences/edit', {experience: experience[0]});
    },
    editExperience: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { title, Year, Description } = req.body;
        const newExperiences = {
            title, 
            Year,
            Description,
        };
        await pool.query('UPDATE experiences set ? WHERE id = ?', [newExperiences, id]);
        req.flash('success', 'experiences Updated Successfully');
        res.redirect('/experiences');
    }
}

module.exports = experiences;