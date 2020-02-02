const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../lib/auth');
const about = require('../controller/about');


//  ESTO HACE QUE FUNCIONE /about/
router.get('/', isLoggedIn,(req,res) => about.getAbout(req, res) );


router.get('/add', isLoggedIn, (req, res) => res.render('about/add'));


//  AQUI ES DONDE SE POSTEA EL CONTENIDO A LA BASE DE DATOS!
router.post('/add', isLoggedIn, (req,res) => about.addAbout(req, res) );


//  Esto es lo que hace que funcione el botón about
router.get('/delete/:id', isLoggedIn,(req,res) => about.deleteAbout(req,res));

//  Esto es lo que hace que funcione el botón Edit
router.get('/edit/:id', isLoggedIn, (req, res) => about.getAbout(req,res));

//  Esto es lo que te permite editar los about
router.post('/edit/:id',(req, res) => about.editAbout(req,res) );


module.exports = router;

