// import data and routes
const router = require('express').Router();
const apiRoutes = require('./api'); 
const homeRoutes = require('./homeRoutes'); 

// Use routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// export data
module.exports = router;