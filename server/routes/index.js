const express = require('express');
const router = express.Router();

const crawlerRoutes = require('./crawler/index');
const apiRoutes = require('./api/index');

router.use('/', crawlerRoutes);
router.use('/api', apiRoutes);

module.exports = router;
