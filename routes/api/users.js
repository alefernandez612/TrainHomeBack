const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers/utils');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const User = require('../../models/user.model');

router
    .get('/', checkToken, checkAdmin, async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (err) {
            res.json({ error: err.message });
        }
    })

    .get('/gender', async (req, res) => {
        try {
            const gender = await User.getGender();
            res.json(gender);
        } catch (err) {
            res.json({ error: err.message });
        }
    })

    .get('/:id', checkToken, async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.getById(id);
            res.json(user);
        } catch (err) {
            res.json({ error: err.message });
        }
    })

    .post('/register',

        body('username')
            .custom(value => User.getByUsername(value).then(user => {
                if (user) {
                    return Promise.reject('El nombre de usuario ya existe.');
                }
            })),
        body('email')
            .custom(value => User.getByEmail(value).then(email => {
                if (email) {
                    return Promise.reject('El email ya existe.');
                }
            })),

        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json(errors.array());
            }
            try {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                const { insertId } = await User.create(req.body);
                const user = await User.getById(insertId);
                res.json(user);
            } catch (err) {
                res.json({ error: err.message });
            }
        })

    .post('/login', async (req, res) => {
        const { username, password } = req.body;

        const user = await User.getByUsername(username);
        if (!user) {
            return res.json({ error: 'Usuario y/o contraseña incorrectos.' });
        }
        const iguales = bcrypt.compareSync(password, user.password);
        if (!iguales) {
            return res.json({ error: 'La contraseña no es correcta' });
        }

        res.json({
            success: 'Login correcto',
            token: createToken(user)
        });
    })

    .put('/:userId', checkToken, (req, res) => {
        const { userId } = req.params;
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        User.update(userId, req.body)
            .then(() => {
                res.json({ success: 'El usuario se ha actualizado correctamente.' });
            }).catch((err) => {
                res.json({ error: err.message });
            });
    })

    .delete('/:userId', checkToken, (req, res) => {
        const { userId } = req.params;
        User.deleteById(userId)
            .then(() => res.json({ success: 'El usuario se ha eliminado correctamente' }))
            .catch((err) => res.json({ error: err.message }));
    });

module.exports = router;