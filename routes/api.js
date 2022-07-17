const router = require('express').Router();
const usersRouter = require('./api/users');

router.use('/users', usersRouter);

module.exports = router;