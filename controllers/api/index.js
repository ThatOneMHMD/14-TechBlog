// import data
const router = require('express').Router();
const userRoutes = require('./userRoutes'); 
const blogRoutes = require('./blogRoutes'); 
const commentRoutes = require('./commentRoutes'); 

// Use routes
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

//export data
module.exports = router;