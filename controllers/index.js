const router = require('express').Router();


const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const readListRoutes = require('./read-list-routes');
/* const dashboardRoutes = require('./dashboard-routes.js'); */

router.use('/', homeRoutes);
/* router.use('/dashboard', dashboardRoutes); */
router.use('/api', apiRoutes);
router.use('/read-list', readListRoutes);

module.exports = router;
