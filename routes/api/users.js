const router = require('express').Router();
const User = require('../../models/user.model');

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const { insertId } = await User.create(req.body);
        const user = await User.getById(insertId);
        res.json(user);
    } catch (err) {
        res.json({ err: err.message });
    }
});

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
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