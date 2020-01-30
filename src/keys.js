const mysql = require('mysql');

module.exports = {

    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'database_links'
    }
}

// db.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MySQL Connected');
// });