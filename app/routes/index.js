const router = require('express').Router();

//this is a master route file, put other routes here (declutters server.js)
router.use('/api/', require('./api/getCommissionResults'));

module.exports = router;