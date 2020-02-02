
const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../lib/auth');
const skills = require('../controller/skills');


//  ESTO HACE QUE FUNCIONE /skills/
router.get('/', isLoggedIn,(req,res) => skills.getSkills(req, res) );


router.get('/add', isLoggedIn, (req, res) => res.render('skills/add'));


//  AQUI ES DONDE SE POSTEA EL CONTENIDO A LA BASE DE DATOS
router.post('/add', isLoggedIn, (req,res) => skills.addSkills(req, res));


//  Esto es lo que hace que funcione el botón Skill
router.get('/delete/:id', isLoggedIn,(req,res) => skills.deleteSkills(req,res));

//  Esto es lo que hace que funcione el botón Edit
router.get('/edit/:id', isLoggedIn, (req, res) => skills.getSkill(req,res));

//  Esto es lo que te permite editar los skills
router.post('/edit/:id',(req, res) => skills.editSkills(req,res));


module.exports = router;
