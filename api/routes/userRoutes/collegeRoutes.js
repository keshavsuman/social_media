const express = require('express');
const collegeRoutes = express.Router();
const collegeController = require('../../controllers/user/collegeController');

// collegeRoutes.post('/addCollege',collegeController.);
// collegeRoutes.post('/updateCollege',collegeController.updateCollege);

module.exports = collegeRoutes;