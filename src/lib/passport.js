const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy ( {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows= await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','Welcome' + user.username));
        } else {
            done(null, false, req.flash('message', 'Incorrect Password'));
        }
    } else {
        return done(null, false, req.flash('message', 'The Username does not exist'));
    }
}));

/*  Use es una interfaz de passport que sirve para el uso del login 
LocalStrategy empaqueta la información del usuario para enviarla a la base de datos
local.signup es el nombre que le darás a la clase que va a correr todo 
PassreqToCallback es para que la funcion se ejecute despues de */
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // Obteniendo el fullname del body
    const { fullname } = req.body;
    
    /*Aca se crea un arreglo llamado newUser para enviarlo a la base de datos */
    const newUser = {
        username,
        password,
        fullname
    };

    //  En esta parte se encripta la contraseña y se asigna al parametro password de newUser
    newUser.password = await helpers.encryptPassword(password);
    //  Ejecutando el query asignandole el new user enviando la variable new user con el password encriptado a la base de datos
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    //  Asignarle el id de lo que regresa la ejecucion del result
    newUser.id = result.insertId;
    return done(null, newUser);
}));

//  Convierte al user en un objeto tipo Json
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//  Aqui convierte la info del usuario en otro tipo de objeto
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows[0]);
});