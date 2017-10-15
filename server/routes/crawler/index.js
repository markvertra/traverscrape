const express = require('express');
const router = express.Router();

const gyg = require('./gyg');
const viator = require('./viator');

router.use('/gyg', gyg);
router.use('/viator', viator);


module.exports = router;
