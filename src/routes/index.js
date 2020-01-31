//  Archivo utilizado para almacenar las rutas principales de la apicación
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
module.exports = router;