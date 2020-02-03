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
        let skills = await pool.query('SELECT * FROM skills WHERE user_id= ?', [req.user.id]);
        const experiences = await pool.query('SELECT * FROM experiences WHERE user_id= ?', [req.user.id]);
        const technologies = await pool.query('SELECT * FROM technologies WHERE user_id= ?', [req.user.id]);
        const info = {
            about: about[0],
            skills,
            experiences,
            technologies
        }
        console.log()
        res.render('about/list', info);
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
            req.flash('success', 'Link saved succesfully');
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
    // sendEmail: async (req,res) =>{
    //     let info = await transporter.sendMail({
    //         from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //         to: "sicu.erickm@gmail.com, alfonsodelag1@gmail.com", // list of receivers
    //         subject: req.subject, // Subject line
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>" // html body
    //       });
    //     console.log("PreviewURL: $s",nodemailer.getTestMessageUrl(info));
    // }
}

module.exports = about;