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
 * Devuelve el resultado de ejecutar la consulta "select * from user where email =?" con el parámetro
 * email.
 * @param email - la dirección de correo electrónico del usuario
 * @returns El resultado de la consulta.
 */
const getByEmail = (email) => {
    return executeQueryOne('select * from user where email = ?', [email]);
};

/**
 * Obtenga todos los usuarios que tengan al menos la edad especificada.
 * @param age - la edad del usuario
 * @returns El resultado de la consulta.
 */
const getByAge = (age) => {
    return executeQuery('select * from user where TIMESTAMPDIFF(YEAR, birthday, CURDATE()) >= ?)', [age]);
};

/**
 * Obtener todos los usuarios con un peso mayor o igual al peso dado.
 * @param weight - El peso del usuario
 * @returns Una promesa.
 */
const getByWeight = (weight) => {
    return executeQuery('select * from user where weight >= ?)', [weight]);
};

/**
 * Toma un objeto con las propiedades nombre de usuario, contraseña, correo electrónico, nombre,
 * apellido, cumpleaños, dirección, teléfono, sexo, altura, peso, avatar y los inserta en la base de
 * datos.
 * @returns El resultado de la consulta.
 */
const create = ({ username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar }) => {
    return executeQuery('insert into user (username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar]);
};

/**
 * Actualiza la información de un usuario en la base de datos.
 * @param id - 1
 * @returns El resultado de la consulta.
 */
const update = (id, { password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar }) => {
    return executeQuery('update user set password = ?, email = ?, name = ?, lastname = ?, birthday = ?, address = ?, phone = ?, gender = ?, height = ?, weight = ?, avatar = ? where id = ?', [password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, id]);
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
    getByAge,
    getByEmail,
    getByWeight,
    create,
    update,
    deleteById
};