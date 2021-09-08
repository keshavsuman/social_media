const express  = require('express');
const auth = require('../../middleware/userAuth');
const collegeValidator = require('../../validators/collegeValidators');
const college = require('../../controllers/collegeController');

const router = express.Router();

router.post('/createCollege', collegeValidator.createCollege, college.createCollege);
router.delete('/deleteCollege', auth, collegeValidator.deleteCollege, college.deleteCollege);
router.post('/getColleges', auth,college.getColleges);
router.post('/editCollege', auth, collegeValidator.updateCollege, college.editCollege);

module.exports = router;
