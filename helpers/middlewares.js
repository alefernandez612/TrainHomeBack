const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getById } = require('../models/user.model');

const checkToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    let tokenUser;

    if (!req.headers['authorization']) {
        return res.json({ error: 'El token necesita un header.' });
    }

    try {
        tokenUser = jwt.verify(token, process.env.API_TOKEN);
    } catch (err) {
        return res.json({ error: 'El token es inválido' });
    }

    if (dayjs().unix() > tokenUser.expDate) {
        return res.json({ error: 'El token está caducado.' });
    }

    try {
        req.user = await getById(tokenUser.userId);
    } catch (err) {
        return res.json({ error: err.message });
    }

    next();
};

const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.json({ error: 'No eres admin.' });
    }
    next();
};

module.exports = {
    checkToken,
    checkAdmin
};