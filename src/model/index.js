
const tabla = '';
const type = '';
const params = '';
const data = '';

const modelPrincipal = (tabla,type, params, data) => {
    const result = '';
    switch (type) {
        case 'SELECT': {
            const where = params ? "where " + params : "";
            result = 'SELECT * FROM' + tabla + where;
        }
            break;
    
        default:
            break;
    }
    return result;

}