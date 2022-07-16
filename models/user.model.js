const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery('select * from user');
};

const getById = (id) => {
    return executeQueryOne('select * from user where id = ?', [id]);
};

const getByEmail = (email) => {
    return executeQueryOne('select * from user where email = ?', [email]);
};

// const getByAge = (birthday) => {
//     return executeQuery('select * from user ', [birthday]);
// };

const create = ({ username, password, email, name, lastname, birthday, address, phone, height, weight }) => {
    return executeQuery('insert into user (username, password, email, name, lastname, birthday, address, phone, height, weight) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, password, email, name, lastname, birthday, address, phone, height, weight]);
};

const update = (id, { password, email, name, lastname, birthday, address, phone, height, weight }) => {
    return executeQuery('update user set password = ?, email = ?, name = ?, lastname = ?, birthday = ?, address = ?, phone = ?, height = ?, weight = ? where id = ?', [password, email, name, lastname, birthday, address, phone, height, weight, id]);
};

const deleteById = (id) => {
    return executeQuery('delete from user where id = ?', [id]);
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    deleteById
};