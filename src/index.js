//  call libraries 
const express      = require('express');
const morgan       = require('morgan');
const exphbs       = require('express-handlebars');
const path         = require('path');
const { pool }     = require('./database.js');
const flash        = require('connect-flash');
const session      = require('express-session');
const MySQLStore   = require('express-mysql-session');
const { database } = require('./keys');
const passport     = require('passport');



//  Initializations
const app = express();
require('./lib/passport');

//  Settings
// Pregunta si existe una variable de entorno llamada "Port" y si no exista asigna el puerto 4000
app.set('port', process.env.PORT || 4000);
//  Asigna a la variable views en base a la unión del directorio las vistas que va a utilizar
app.set('views', path.join(__dirname, 'views'));
// Engine para el manejo de vistas. Utiliza hbs
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
//  Asigna el motor para manejo de vistas a los .hbs
app.set('view engine', '.hbs');

//  Middlewares= manejo de la lógica de negocio (donde haras las funciones)
app.use(session({
    secret: 'alfonsodelag',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//  Global Vars
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.success = req.flash('message');
    app.locals.user = req.user;
    next();
});

//  Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use(require('./routes/test'));


//  Public
app.use(express.static(path.join(__dirname, 'public')));

//  Starting
app.listen(app.get('port'), () => console.log('server on port', app.get('port')));
