//  Llamados a librerias
//  llamado a libreria de mysql
const mysql = require('mysql');
const { promisify } = require('util');
//  Mandar a llamar las llaves para tu conexión a la base de datos
const { database } = require('./keys');

//  Un pool es el nombre de la conexión de la base de datos.
const pool = mysql.createPool(database);

//  getConnection sirve para realizar la conexión a la base de datos
pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query);
 
module.exports = pool;