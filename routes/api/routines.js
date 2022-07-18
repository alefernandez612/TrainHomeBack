const router = require('express').Router();
const Routine = require('../../models/routine.model');

router.get('/', async (req, res) => {
    try {
        const routines = await Routine.getAll();
        res.json(routines);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const routine = await Routine.getById(id);
        res.json(routine);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/objetive/:objetive', async (req, res) => {
    try {
        const { objetive } = req.params;
        const routine = await Routine.getByObjetive(objetive);
        res.json(routine);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/muscle/:muscle', async (req, res) => {
    try {
        const { muscle } = req.params;
        const routine = await Routine.getByMuscle(muscle);
        res.json(routine);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/difficulty/:difficulty', async (req, res) => {
    try {
        const { difficulty } = req.params;
        const routine = await Routine.getByDifficulty(difficulty);
        res.json(routine);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { insertId } = await Routine.create(req.body);
        const routine = await Routine.getById(insertId);
        res.json(routine);
    } catch (err) {
        res.json({ err: err.message });
    }
});

router.put('/:routineId', (req, res) => {
    const { routineId } = req.params;
    Routine.update(routineId, req.body)
        .then(() => {
            res.json({ success: 'La rutina se ha actualizado correctamente.' });
        }).catch((err) => {
            res.json({ error: err.message });
        });
});

router.delete('/:routineId', (req, res) => {
    const { routineId } = req.params;
    Routine.deleteById(routineId)
        .then(() => res.json({ success: 'La rutina se ha eliminado correctamente' }))
        .catch((err) => res.json({ error: err.message }));
});

module.exports = router;