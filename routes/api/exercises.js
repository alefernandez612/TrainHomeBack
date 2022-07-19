const router = require('express').Router();
const Exercise = require('../../models/exercise.model');

router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.getAll();
        res.json(exercises);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.getById(id);
        res.json(exercise);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/name/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const exercises = await Exercise.getByName(name);
        res.json(exercises);
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;