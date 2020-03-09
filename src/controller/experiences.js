//  Te permite accedar a la información del modelo de Links
//const link = require('../model/experiences');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');


const experiences = {
    getExperiences: async (req,res) => {
        const experiences = await pool.query('SELECT * FROM experiences WHERE user_id= ?', [req.user.user_id]);
        res.render('experiences/list', { experiences });
    },
    addExperience: async (req,res) => {
        const { title, year, description } = req.body;
        const experience = {
            title,
            year,
            description,
            user_id: req.user.user_id
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
        await pool.query('DELETE FROM experiences WHERE user_id =?', [user_id]);
        req.flash('success', 'experiences Removed succesfully');
        res.redirect('/experiences');
    },
    getExperience: async (req, res) => {
        const { user_id } = req.params;
        const experience = await pool.query('SELECT * FROM experiences WHERE user_id = ?', [user_id]);
        console.log(experience[0]);
        res.render('experiences/edit', {experience: experience[0]});
    },
    editExperience: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { title, year, description } = req.body;
        const newExperiences = {
            title, 
            year,
            description,
        };
        await pool.query('UPDATE experiences set ? WHERE user_id = ?', [newExperiences, user_id]);
        req.flash('success', 'experiences Updated Successfully');
        res.redirect('/experiences');
    }
}

module.exports = experiences;