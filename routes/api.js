const router = require('express').Router();
const usersRouter = require('./api/users');
const routinesRouter = require('./api/routines');
const exercisesRouter = require('./api/exercises');

router.use('/users', usersRouter);
router.use('/routines', routinesRouter);
router.use('/exercises', exercisesRouter);

module.exports = router;