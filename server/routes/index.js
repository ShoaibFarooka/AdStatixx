const express = require('express');
const UserRoutes = require('./userRoutes');
const campaignRoutes = require('./campaignRoutes');

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/campaign', campaignRoutes);

module.exports = router;