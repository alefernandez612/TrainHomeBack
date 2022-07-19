const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');
const User = require('../../models/user.model');

router.get('/', checkToken, async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        res.json(user);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// { username, password, email, name, lastname, birthday, address, phone, gender, height, weight, avatar, objetive_id }

router.post('/registro',

    body('username')
        .exists()
        .withMessage("El campo username es requerido.")
        .isLength({ min: 3, max: 15 })
        .withMessage("El campo username debe tener mínimo 3 caracteres y máximo 15 caracteres.")
        .custom(value => User.getByUsername(value).then(user => {
            if (user) {
                return Promise.reject('El nombre de usuario ya existe.');
            }
        })),

    body('password')
        .exists()
        .withMessage("El campo password es requerido.")
        .isLength({ min: 8, max: 20 })
        .withMessage("El campo password debe tener mínimo 8 caracteres y máximo 20 caracteres."),

    // body('username')
    //     .exists()
    //     .withMessage("El campo username es requerido.")
    //     .isLength({ min: 3, max: 15 })
    //     .withMessage("El campo username debe tener mínimo 3 caracteres y máximo 15 caracteres.")
    //     .custom(value => User.getByUsername(value).then(user => {
    //         if (user) {
    //             return Promise.reject('El nombre de usuario ya existe.');
    //         }
    //     })),

    // body('username')
    //     .exists()
    //     .withMessage("El campo username es requerido.")
    //     .isLength({ min: 3, max: 15 })
    //     .withMessage("El campo username debe tener mínimo 3 caracteres y máximo 15 caracteres.")
    //     .custom(value => User.getByUsername(value).then(user => {
    //         if (user) {
    //             return Promise.reject('El nombre de usuario ya existe.');
    //         }
    //     })),

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
    });

router.post('/login', async (req, res) => {
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
});

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    User.update(userId, req.body)
        .then(() => {
            res.json({ success: 'El usuario se ha actualizado correctamente.' });
        }).catch((err) => {
            res.json({ error: err.message });
        });
});

router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    User.deleteById(userId)
        .then(() => res.json({ success: 'El usuario se ha eliminado correctamente' }))
        .catch((err) => res.json({ error: err.message }));
});

module.exports = router;