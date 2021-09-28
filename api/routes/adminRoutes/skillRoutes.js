const express  = require('express');
const skillValidator = require('../../validators/skillValidators');
const skill = require('../../controllers/skillController');

const auth = require('../../middleware/userAuth');

const router = express.Router();

router.post('/createSkill', auth, skillValidator.createSkill, skill.createSkill);
router.delete('/deleteSkill', auth, skillValidator.deleteSkill, skill.deleteSkill);
router.post('/getSkills', skill.getSkills);
router.post('/updateSkill', auth, skillValidator.updateSkill, skill.editSkill);
router.get('/updateSkillStatus', skill.updateSkillStatus);

module.exports = router;
