//  Te permite accedar a la información del modelo de contact
const user = require('../model/contact');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');



const contact = {
    getContactInfo: async (req,res) => {
        const contact = await pool.query('SELECT * FROM contact WHERE user_id= ?', [req.user.id]);
        res.render('contact/list', { contact });
    },
    addContact: async (req,res) => {
        const { email, title, description } = req.body;
        const contact = {
            email,
            title,
            description,
            user_id: req.user.id
        };
        try{
            await pool.query('INSERT INTO contact set ?', [contact]);
            req.flash('success', 'user saved succesfully');
            res.redirect('/contact');
        } catch(e) {
            console.log(e);
        }
    },
    deleteContact: async (req,res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM contact WHERE ID =?', [id]);
        req.flash('success', 'contact Removed succesfully');
        res.redirect('/contact');
    },
    getContact: async (req, res) => {
        const { id } = req.params;
        const contact = await pool.query('SELECT * FROM contact WHERE id = ?', [id]);
        console.log(contact[0]);
        res.render('contact/edit', {user: contact[0]});
    },
    editContact: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { email, title, description } = req.body;
        const newcontact = {
            email, 
            title,
            description
        };
        await pool.query('UPDATE contact set ? WHERE id = ?', [newcontact, id]);
        req.flash('success', 'user Updated Successfully');
        res.redirect('/contact');
    }
}

module.exports = contact;