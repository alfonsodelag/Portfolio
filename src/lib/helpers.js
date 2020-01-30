const bcrypt = require('bcryptjs');

const helpers = {};


/* Funcion para cifrar la contraseña, usando salt y hash.
Salt es información sobre la creacion del password
Hash es una llave que usaras para cifrar la contraseña */
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

/* compara si la contraseña ingresada coincide con la que introduce el usuario */
helpers.matchPassword = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
    }
};

//  Exporta o pone visibles el objeto de funciones que vas a utilizar en el proyecto
module.exports = helpers;