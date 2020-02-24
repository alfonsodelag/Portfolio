//  Te permite accedar a la información del modelo de Links
//const link = require('../model/about');

//  Pool son las funciones para manejar la base de datos
const pool = require('../config/database.js');
const nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport({
//     host: "imap.gmail.com",
//     port: 993, //995
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     }
//   });
const about = {

    getAboutInfo: async (req,res) => {
        const about = await pool.query('SELECT * FROM about WHERE user_id= ?', [req.user.id]);
        res.render('about/list', { about });
    },
    addAbout: async (req,res) => {
        const { title, description } = req.body;
        const about = {
            title,
            description,
            user_id: req.user.id
        };
        try{
            await pool.query('INSERT INTO about set ?', [about]);
            req.flash('success', 'about saved succesfully');
            res.redirect('/about');
        } catch(e) {
            console.log(e);
        }
    },
    deleteAbout: async (req,res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM about WHERE ID =?', [id]);
        req.flash('success', 'about Removed succesfully');
        res.redirect('/about');
    },
    getAbout: async (req, res) => {
        const { id } = req.params;
        const about = await pool.query('SELECT * FROM about WHERE id = ?', [id]);
        console.log(about[0]);
        res.render('about/edit', {about: about[0]});
    },
    editAbout: async (req, res) => {
        console.log();
        const { id } = req.params;
        const { username, description } = req.body;
        const newabout = {
            username,
            description,
            user_id: req.user.id
        };
        await pool.query('UPDATE about set ? WHERE id = ?', [newabout, id]);
        req.flash('success', 'about Updated Successfully');
        res.redirect('/about');
    }
}

module.exports = about;