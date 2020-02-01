const express = require('express');
const router  = express.Router();

const { isLoggedIn } = require('../lib/auth');
const links = require('../controller/links');

router.get('/add', isLoggedIn, (req, res) => res.render('links/add'));


//  AQUI ES DONDE SE POSTEA EL CONTENIDO A LA BASE DE DATOS!
router.post('/add', isLoggedIn, (req,res) => links.addLink(req, res) );

//  ESTO HACE QUE FUNCIONE /links/
router.get('/', isLoggedIn,(req,res) => links.getLinks(req, res) );

//  Esto es lo que hace que funcione el botón LINK
router.get('/delete/:id', isLoggedIn,(req,res) => links.deleteLink(req,res));

//  Esto es lo que hace que funcione el botón Edit
router.get('/edit/:id', isLoggedIn, (req, res) => links.getLink(req,res));

//  Esto es lo que te permite editar los links
router.post('/edit/:id',(req, res) => links.editLink(req,res) );


module.exports = router;

