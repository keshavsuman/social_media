const express = require('express');
const admin = require('../../controllers/adminController');
const adminValidator = require('../../validators/adminValidators');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/getRoles', auth, admin.getRoles);
router.post('/addRole',auth, adminValidator.addRole, admin.addRole);
router.delete('/deleteRole', auth, adminValidator.deleteRole, admin.deleteRole);
router.get('/editRole', auth, adminValidator.editRole, admin.editRole);
router.get('/roles', auth, admin.roles);
router.post('/updateRole', auth, adminValidator.updateRole, admin.updateRole);
router.get('/updateRoleStatus',auth, adminValidator.updateRoleStatus,admin.updateRoleStatus);

module.exports=router;