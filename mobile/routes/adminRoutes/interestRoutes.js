const express  = require('express');
const interest = require('../../controllers/interestController');
const interestValidator = require('../../validators/interestValidators');
const auth = require('../../middleware/userAuth');

const router = express.Router();

router.post('/createInterest', auth, interestValidator.createInterest, interest.createInterest);
router.delete('/deleteInterest', auth, interestValidator.deleteInterest, interest.deleteInterest);
router.post('/getInterests', interest.getInterests);
router.post('/updateInterest', auth, interest.updateInterest);
router.get('/editInterest', auth, interest.editInterest);
router.get('/updateInterestStatus',auth, interest.updateInterestStatus);

module.exports = router;
