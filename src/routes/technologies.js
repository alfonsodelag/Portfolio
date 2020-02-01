
const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../lib/auth');
const technologies = require('../controller/technologies');


//  ESTO HACE QUE FUNCIONE /technologies/
router.get('/', isLoggedIn,(req,res) => technologies.getTechnologies(req, res) );


router.get('/add', isLoggedIn, (req, res) => res.render('technologies/add'));


//  AQUI ES DONDE SE POSTEA EL CONTENIDO A LA BASE DE DATOS!
router.post('/add', isLoggedIn, (req,res) => technologies.addTechnology(req, res) );


//  Esto es lo que hace que funcione el botón Technology
router.get('/delete/:id', isLoggedIn,(req,res) => technologies.deleteTechnology(req,res));

//  Esto es lo que hace que funcione el botón Edit
router.get('/edit/:id', isLoggedIn, (req, res) => technologies.getTechnology(req,res));

//  Esto es lo que te permite editar los technologies
router.post('/edit/:id',(req, res) => technologies.editTechnology(req,res) );


module.exports = router;

