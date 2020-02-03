const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../lib/auth');
const contact = require('../controller/contact');


//  ESTO HACE QUE FUNCIONE /contact/
router.get('/', isLoggedIn,(req,res) => contact.getContactInfo(req, res) );


router.get('/add', isLoggedIn, (req, res) => res.render('contact/add'));


//  AQUI ES DONDE SE POSTEA EL CONTENIDO A LA BASE DE DATOS!
router.post('/add', isLoggedIn, (req,res) => contact.addContact(req, res) );


//  Esto es lo que hace que funcione el botón contact
router.get('/delete/:id', isLoggedIn,(req,res) => contact.deleteContact(req,res));

//  Esto es lo que hace que funcione el botón Edit
router.get('/edit/:id', isLoggedIn, (req, res) => contact.getContact(req,res));

//  Esto es lo que te permite editar los contact
router.post('/edit/:id',(req, res) => contact.editContact(req,res) );


module.exports = router;

