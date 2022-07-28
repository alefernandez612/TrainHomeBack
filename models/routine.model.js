const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * Obtenga todas las rutinas y, para cada rutina, obtenga la duración total de todos los ejercicios de
 * esa rutina.
 * @returns Una matriz de objetos.
 */
const getAll = () => {
    return executeQuery('select r.*, sec_to_time(count(er.routine_id)*40 + sum(e.duration)) as duration from routine r join exercise_routine er on r.id = er.routine_id join exercise e on er.exercise_id = e.id group by er.routine_id');
};

/**
 * Obtenga una rutina por ID y también obtenga la duración total de la rutina sumando la duración de
 * cada ejercicio en la rutina.
 * @param id - El id de la rutina a obtener.
 * @returns Un objeto con las siguientes propiedades:
 * id, nombre, duración, created_at, updated_at
 */
const getById = (id) => {
    return executeQueryOne('select r.*, sec_to_time(count(er.routine_id)*40 + sum(e.duration)) as duration from routine r join exercise_routine er on r.id = er.routine_id join exercise e on er.exercise_id = e.id group by er.routine_id having (r.id = ?)', [id]);
};

/**
 * Devuelve una promesa que se resuelve en una matriz de objetos.
 * @param objetive - el nombre del objetivo
 * @returns Una matriz de objetos.
 */
const getByObjetive = (objetive) => {
    return executeQuery('select id, name, (select name from objetive where objetive.id = routine.objetive_id) as objetive from routine where objetive_id = (select id from objetive where name like ?)', [`%${objetive}%`]);
};

/**
 * Devuelve una promesa que se resuelve en una matriz de objetos, cada objeto representa una fila en la
 * base de datos.
 * @param muscle - el nombre del músculo
 * @returns Una matriz de objetos.
 */
const getByMuscle = (muscle) => {
    return executeQuery('select id, name, (select name from muscle where muscle.id = routine.muscle_id) as muscle from routine where muscle_id = (select id from muscle where name like ?)', [`%${muscle}%`]);
};

/**
 * Devuelve una promesa que se resuelve en una matriz de objetos.
 * @param difficulty - la dificultad de la rutina
 * @returns Una matriz de objetos.
 */
const getByDifficulty = (difficulty) => {
    return executeQuery('select * from routine where difficulty = ?', [difficulty]);
};

/**
 * Devuelve una promesa que se resuelve en una matriz de objetos, cada uno de los cuales contiene una
 * sola propiedad, route_id.
 * @param id - id_usuario
 * @returns Una matriz de objetos.
 */
const getRoutineByUserId = (id) => {
    return executeQuery('select routine_id from history where user_id = ?', [id]);
};

/**
 * Esta función crea una nueva rutina en la base de datos.
 * @returns El resultado de la consulta.
 */
const create = ({ name, difficulty, user_id, objetive_id, muscle_id }) => {
    return executeQuery('insert into routine (name, difficulty, user_id, objetive_id, muscle_id) values (?, ?, ?, ?, ?)', [name, difficulty, user_id, objetive_id, muscle_id]);
};

/**
 * Actualiza una fila en la base de datos con la identificación dada, usando el nombre dado, la
 * dificultad, la identificación del usuario, la identificación del objetivo y la identificación del
 * músculo.
 * @param id - el id de la rutina.
 * @returns El resultado de la consulta.
 */
const update = (id, { name, difficulty, user_id, objetive_id, muscle_id }) => {
    return executeQuery('update user set name = ?, difficulty = ?, user_id = ?, objetive_id = ?, muscle_id = ? where id = ?', [name, difficulty, user_id, objetive_id, muscle_id, id]);
};

/**
 * Elimina una fila de la tabla de rutina donde la identificación coincide con la identificación
 * pasada.
 * @param id - el id de la rutina a borrar
 * @returns El resultado de la consulta.
 */
const deleteById = (id) => {
    return executeQuery('delete from routine where id = ?', [id]);
};

module.exports = {
    getAll,
    getById,
    getByObjetive,
    getByMuscle,
    getByDifficulty,
    getRoutineByUserId,
    create,
    update,
    deleteById
};