const { Router } = require('express');
const router = Router();

const getTempsRouter = require('./getTemps');
const getDogsRouter = require('./getDogs');

router.use('/temperaments', getTempsRouter)
router.use('/dogs', getDogsRouter)

module.exports = router;