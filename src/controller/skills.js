//  Te permite accedar a la información del modelo de Links
//const link = require('../model/skills');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');


const skills = {
    getSkills: async (req,res) => {
        const skills = await pool.query('SELECT * FROM skills WHERE user_id= ?', [req.user.user_id]);
        res.render('skills/list', { skills });
    },
    addSkills: async (req,res) => {
        const { title, level } = req.body;
        const skill = {
            title,
            level,
            user_id: req.user.user_id
        };
        try{
            await pool.query('INSERT INTO skills set ?', [skill]);
            req.flash('success', 'Skill saved succesfully');
            res.redirect('/skills');
        } catch(e) {
            console.log(e);
        }
    },
    deleteSkills: async (req,res) => {
        const { user_id } = req.params;
        await pool.query('DELETE FROM skills WHERE user_id =?', [user_id]);
        req.flash('success', 'skills Removed succesfully');
        res.redirect('/skills');
    },
    getSkill: async (req, res) => {
        const { user_id } = req.params;
        const skill = await pool.query('SELECT * FROM skills WHERE user_id = ?', [user_id]);
        console.log(skill[0]);
        res.render('skills/edit', {Skill: skill[0]});
    },
    editSkills: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { title, level } = req.body;
        const newSkills = {
            title, 
            level,
        };
        await pool.query('UPDATE skills set ? WHERE user_id = ?', [newSkills, id]);
        req.flash('success', 'Skills Updated Successfully');
        res.redirect('/skills');
    }
}

module.exports = skills;