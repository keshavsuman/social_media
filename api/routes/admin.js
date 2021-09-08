const express = require('express');
const router = express.Router();

const admin = require('../controllers/adminController');
const user = require('../controllers/userController');

const profile = require('../controllers/profileController');
const dashboard = require('../controllers/dashboardController');
const adminValidator = require('../validators/adminValidators');
const auth = require('../middleware/auth');

const postRoutes  = require('./adminRoutes/postRoutes');
const universityRoutes = require('./adminRoutes/universityRoutes');
const roleRoutes = require('./adminRoutes/roleRoutes');
const interestRoutes = require('./adminRoutes/interestRoutes');
const collegeRoutes = require('./adminRoutes/collegeRoutes');
const skillRoutes = require('./adminRoutes/skillRoutes');

router.use('/post',postRoutes);
router.use('/university',universityRoutes);
router.use('/role',roleRoutes);
router.use('/interests',interestRoutes);
router.use('/college',collegeRoutes);
router.use('/skills',skillRoutes);

router.post('/login', adminValidator.login, admin.login);
router.get('/logout', auth, admin.logout);
router.post('/forgotPassword', adminValidator.forgotPassword, admin.forgotPassword);
router.post('/resetPassword', adminValidator.resetPassword, admin.resetPassword);

router.get('/admins', auth, admin.admins);
router.post('/createAdmin',adminValidator.createAdmin, admin.createAdmin);
router.post('/updateAdmin', auth, adminValidator.updateAdmin, admin.updateAdmin);
router.delete('/deleteAdmin/:Id', auth, adminValidator.deleteAdmin, admin.deleteAdmin);
router.get('/updateAdminStatus', auth, admin.updateAdminStatus);
router.post('/registerAdmin', adminValidator.registerAdmin,admin.registerAdmin);

router.get('/permissionList', admin.permissionList);
router.post('/addPermission', admin.addPermission);

router.get('/users', auth, user.users);
router.post('/searchusers', auth, user.searchusers);
router.get('/editUser', auth, user.editUser);
router.post('/updateUser', auth, user.updateUser);
router.get('/updateUserStatus', auth, user.updateUserStatus);
router.get('/userProfile/:id', profile.userProfile);

router.get('/dashboardData', dashboard.dashboardData);

module.exports = router;