const router = require('express').Router();
const usersRouter = require('./api/users');

router.use('/api/users', usersRouter);

module.exports = router;