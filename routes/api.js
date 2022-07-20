const router = require('express').Router();
const usersRouter = require('./api/users');
const routinesRouter = require('./api/routines');
const exercisesRouter = require('./api/exercises');
const { checkToken } = require('../../helpers/middlewares');


router.use('/users', usersRouter);
router.use('/routines', checkToken, routinesRouter);
router.use('/exercises', checkToken, exercisesRouter);

module.exports = router;