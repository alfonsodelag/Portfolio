//  Te permite accedar a la información del modelo de users
const user = require('../model/users');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');



const users = {
    getUsers: async (req,res) => {
        const users = await pool.query('SELECT * FROM users WHERE user_id= ?', [req.user.id]);
        res.render('users/list', { users});
    },
    addUser: async (req,res) => {
        const { title, url, description } = req.body;
        const user = {
            username,
            password,
            fullname,
            user_id: req.user.id
        };
        try{
            await pool.query('INSERT INTO users set ?', [user]);
            req.flash('success', 'user saved succesfully');
            res.redirect('/users');
        } catch(e) {
            console.log(e);
        }
    },
    deleteUser: async (req,res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE ID =?', [id]);
        req.flash('success', 'users Removed succesfully');
        res.redirect('/users');
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        console.log(users[0]);
        res.render('users/edit', {user: users[0]});
    },
    editUser: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { title, description, url } = req.body;
        const newuser = {
            title, 
            description,
            url
        };
        await pool.query('UPDATE users set ? WHERE id = ?', [newuser, id]);
        req.flash('success', 'user Updated Successfully');
        res.redirect('/users');
    }
}

module.exports = users;