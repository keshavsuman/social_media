const express = require('express');
const university = require('../../controllers/universityController');
const universityValidator = require('../../validators/universityValidators');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/createUniversity', universityValidator.createUniversity, university.createUniversity);
router.delete('/deleteUniversity', auth, universityValidator.deleteUniversity, university.deleteUniversity);
router.post('/getUniversities', university.getUniversities);
router.post('/updateUniversity', auth, universityValidator.updateUniversity, university.updateUniversity);
router.get('/getUniversitiesList',auth, university.getUniversitiesListAdmin);
router.get('/updateUniversityStatus',auth, university.updateUniversityStatus);
router.get('/editUniversity',auth,university.editUniversity);

module.exports=router;