const { format } = require('timeago.js');


//  Aqui se crea el objeto helpers vacío.
const helpers = {};

//  Se le mete al objeto helpers el parámetro timeago que a su vez es una función que formatea el timestamp
helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;