const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../lib/auth');
const experiences = require('../controller/experiences');


//  ESTO HACE QUE FUNCIONE /experiences/
router.get('/', isLoggedIn,(req,res) => experiences.getExperiences(req, res) );


router.get('/add', isLoggedIn, (req, res) => res.render('experiences/add'));


//  AQUI ES DONDE SE POSTEA EL CONTENIDO A LA BASE DE DATOS!
router.post('/add', isLoggedIn, (req,res) => experiences.addExperience(req, res) );


//  Esto es lo que hace que funcione el botón Experience
router.get('/delete/:id', isLoggedIn,(req,res) => experiences.deleteExperience(req,res));

//  Esto es lo que hace que funcione el botón Edit
router.get('/edit/:id', isLoggedIn, (req, res) => experiences.getExperience(req,res));

//  Esto es lo que te permite editar los experiences
router.post('/edit/:id',(req, res) => experiences.editExperience(req,res) );


module.exports = router;

