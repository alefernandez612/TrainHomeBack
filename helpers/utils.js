/**
 * @description Esta función recibe como parámetros una consulta junto a los valores para filtrarla y devuelve el resultado de una consulta.
 * @param {string} sql Recibe como parámetro un string.
 * @param {Array} [values=[]] Recibe como parámetros un Array | undefined.
 * @returns {Promise<Array>} Devuelve una Promise con un Array de objetos.
 */
function executeQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

/**
 * @description Esta función recibe como parámetros una consulta junto a los valores para filtrarla y devuelve el resultado de una consulta con una única fila. Usado principalmente en métodos GET de filtros con valores únicos en la tabla.
 * @param {string} sql Recibe como parámetro un string.
 * @param {Array} values Recibe como parámetros un Array
 * @returns {Promise} Devuelve una Promise con un objeto.
 */
function executeQueryOne(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) return resolve(null);
            resolve(result[0]);
        });
    });
}

module.exports = {
    executeQuery,
    executeQueryOne
};