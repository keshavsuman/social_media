const express = require('express');
const InterestController = require('../../controllers/user/intrestController');
const router = express.Router();
const interestValidator = require('../../validators/interestValidators');
const auth =require('../../middleware/userAuth');

router.use(auth);

router.get('/getInterest',InterestController.getInterests);
router.post('/createInterest',interestValidator.createInterest,InterestController.createInterest);
router.post('/deleteInterest',interestValidator.deleteInterest,InterestController.deleteInterest);

module.exports = router;