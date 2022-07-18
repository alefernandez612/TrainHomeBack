const router = require('express').Router();
const usersRouter = require('./api/users');
const routinesRouter = require('./api/routines');

router.use('/users', usersRouter);
router.use('/routines', routinesRouter);

module.exports = router;