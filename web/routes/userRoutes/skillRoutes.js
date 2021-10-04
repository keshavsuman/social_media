const express = require('express');
const UserSkillController = require('../../controllers/user/skillController');
const auth = require('../../middleware/userAuth');
const skilValidator = require('../../validators/skillValidators');

const router = express.Router();

router.use(auth);

/**
 * Header with authorization in required like 
 * Authorization:'Bearer ${authentication  Token}'
 * 
 */
router.get('/getSkills', UserSkillController.getSkills);
/**
 * Header with authorization in required like 
 * Authorization:'Bearer ${authentication Token}'
 * body={
 *  "name":"name of the skill"
 * }
 * 
 */

router.post('/createSkill',skilValidator.createSkill,UserSkillController.createSkill);

/**
 * 
 * Header with authorization in required like 
 * Authorization:'Bearer ${authentication Token}'
 * body={
 *  "name":"name of the skill"
 *  "id":"id of the skill"
 * }
 */
router.post('/deleteSkill',skilValidator.createSkill,UserSkillController.deleteSkill);

module.exports = router;