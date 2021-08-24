const express = require('express');
const universityRoutes = express.Router();
const universityController = require('../../controllers/user/universityController');

// universityRoutes.post('/addUniversity',universityController.addUniversity);
// universityRoutes.post('/updateUniversity',universityController.updateUniversity);

module.exports = universityRoutes;