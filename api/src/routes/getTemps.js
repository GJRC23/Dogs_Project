const express = require('express');
const router = express.Router();
const { getTemps } = require('../controllers/getTemps');

// Ruta para obtener todos los temperamentos
router.get('/', async (req, res) => {
    try {
        const temperaments = await getTemps();
        return res.json(temperaments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;