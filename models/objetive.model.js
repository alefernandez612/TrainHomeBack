const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * Devuelve el resultado de ejecutar una consulta que selecciona todas las filas de la tabla denominada
 * objetivo.
 * @returns Una matriz de objetos.
 */
const getAll = () => {
    return executeQuery('select * from objetive');
};

/**
 * Esta función devuelve el resultado de ejecutar una consulta que selecciona todas las columnas de la
 * tabla objetiva donde la columna id es igual al parámetro id.
 * @param id - la identificación del objetivo
 * @returns el resultado de la función executeQueryOne.
 */
const getById = (id) => {
    return executeQueryOne('select * from objetive where id = ?', [id]);
};

/**
 * Devuelve una promesa que se resuelve en una matriz de objetos, cada uno de los cuales tiene una
 * propiedad de nombre que contiene la cadena que se pasa a la función.
 * @param name - El nombre del objetivo
 * @returns Una matriz de objetos.
 */
const getByName = (name) => {
    return executeQuery('select * from objetive where name like ?', [`%${name}%`]);
};

module.exports = {
    getAll,
    getById,
    getByName
};