const express = require('express');
const UserRoutes = require('./userRoutes');

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);

module.exports = router;