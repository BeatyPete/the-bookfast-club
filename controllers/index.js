const router = require('express').Router();


const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const readListRoutes = require('./readlist-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

router.use('/api', apiRoutes);
router.use('/readlist', readListRoutes);

module.exports = router;
