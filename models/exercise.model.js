const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * Devuelve el resultado de ejecutar una consulta que selecciona todas las filas de la tabla de
 * ejercicios.
 * @returns Una matriz de objetos.
 */
const getAll = () => {
    return executeQuery('select * from exercise');
};

/**
 * Esta función devuelve una promesa que se resuelve en un objeto que representa una fila en la tabla
 * de ejercicios.
 * @param id - el id del ejercicio a recuperar
 * @returns el resultado de la función executeQueryOne.
 */
const getById = (id) => {
    return executeQueryOne('select * from exercise where id = ?', [id]);
};

const getByName = (name) => {
    return executeQuery('select * from exercise where name like ?', [`%${name}%`]);
};

module.exports = {
    getAll,
    getById,
    getByName
};