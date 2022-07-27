const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * Devuelve el resultado de ejecutar una consulta que selecciona todas las filas de la tabla de
 * usuario.
 * @returns Una promesa.
 */
const getAll = () => {
    return executeQuery('select * from user');
};

/**
 * GetById devuelve el resultado de ejecutar la consulta 'select * from user where id = ?' con el id
 * dado como parámetro.
 * @param id - El id del usuario a obtener
 * @returns El valor de retorno es una promesa.
 */
const getById = (id) => {
    return executeQueryOne('select * from user where id = ?', [id]);
};

/**
 * GetByEmail devuelve el resultado de ejecutar la consulta 'select * from user where email = ?' con el
 * parámetro email.
 * @param email - la dirección de correo electrónico del usuario
 * @returns El resultado de la consulta.
 */
const getByEmail = (email) => {
    return executeQueryOne('select * from user where email = ?', [email]);
};


/**
 * GetByUsername devuelve el resultado de ejecutar la consulta 'select * from user where username = ?'
 * con el parámetro nombre de usuario.
 * @param username - el nombre de usuario del usuario que desea obtener
 * @returns El resultado de la consulta.
 */
const getByUsername = (username) => {
    return executeQueryOne('select * from user where username = ?', [username]);
};

/**
 * Obtener el historial de un usuario por su id.
 * @param id - la identificación del usuario
 * @returns Una matriz de objetos.
 */
const getHistoryById = (id) => {
    return executeQuery('select (select name from routine where routine.id = history.routine_id) as routine, date from history where user_id = ?', [id]);
};

/**
 * Devuelve una promesa que se resuelve en una matriz de objetos, cada objeto contiene una sola
 * propiedad, género, que es una cadena.
 * @returns Una matriz de objetos.
 */
const getGender = () => {
    return executeQuery('select gender from user group by gender');
};

/**
 * Toma un objeto con las propiedades nombre de usuario, contraseña, correo electrónico, nombre,
 * apellido, cumpleaños, dirección, teléfono, sexo, altura, peso, avatar y los inserta en la base de
 * datos.
 * @returns El resultado de la consulta.
 */
const create = ({ username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, objetive_id }) => {
    return executeQuery('insert into user (username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, objetive_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, objetive_id]);
};

/**
 * Actualiza la información de un usuario en la base de datos.
 * @param id - El id del usuario.
 * @returns El resultado de la consulta.
 */
const update = (id, { password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, objetive_id }) => {
    return executeQuery('update user set password = ?, email = ?, name = ?, lastname = ?, birthday = ?, address = ?, phone = ?, gender = ?, height = ?, weight = ?, avatar = ?, objetive_id = ? where id = ?', [password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, objetive_id, id]);
};

/**
 * Elimina un usuario de la base de datos por id
 * @param id - El id del usuario a eliminar
 * @returns El valor de retorno es una Promesa.
 */
const deleteById = (id) => {
    return executeQuery('delete from user where id = ?', [id]);
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    getByUsername,
    getHistoryById,
    getGender,
    create,
    update,
    deleteById
};