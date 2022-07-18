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
 * @param id - 1
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
    create,
    update,
    deleteById
};