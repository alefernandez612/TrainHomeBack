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

module.exports = router;