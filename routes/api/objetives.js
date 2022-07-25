const router = require('express').Router();
const Objetive = require('../../models/objetive.model');

router
    .get('/', async (req, res) => {
        try {
            const objetives = await Objetive.getAll();
            res.json(objetives);
        } catch (err) {
            res.json({ error: err.message });
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const objetive = await Objetive.getById(id);
            res.json(objetive);
        } catch (err) {
            res.json({ error: err.message });
        }
    })

    .get('/name/:name', async (req, res) => {
        try {
            const { name } = req.params;
            const objetives = await Objetive.getByName(name);
            res.json(objetives);
        } catch (err) {
            res.json({ error: err.message });
        }
    });

module.exports = router;