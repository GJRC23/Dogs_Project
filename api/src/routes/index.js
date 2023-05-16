const express = require('express');
const router = express.Router();

const getTempsRouter = require('./getTemps');
const getDogsRouter = require('./getDogs');

router.use('/temperaments', getTempsRouter);
router.use('/dogs', getDogsRouter);

module.exports = router;