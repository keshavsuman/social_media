const express = require('express');
const router = express.Router();

const admin = require('../controllers/adminController');
const interest = require('../controllers/interestController');
const skillValidator = require('../validators/skillValidators');
const collegeValidator = require('../validators/collegeValidators');
const skill = require('../controllers/skillController');
const courseValidator = require('../validators/courseValidators');
const college = require('../controllers/collegeController');
const course = require('../controllers/courseController');
const user = require('../controllers/userController');

const profile = require('../controllers/profileController');
const dashboard = require('../controllers/dashboardController');
const adminValidator = require('../validators/adminValidators');
const interestValidator = require('../validators/interestValidators');
const auth = require('../middleware/auth');

const postRoutes  = require('./adminRoutes/postRoutes');
const universityRoutes = require('./adminRoutes/universityRoutes');
const roleRoutes = require('./adminRoutes/roleRoutes');


router.use('/post',postRoutes);
router.use('/university',universityRoutes);
router.use('/role',roleRoutes);

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

router.post('/createInterest', auth, interestValidator.createInterest, interest.createInterest);
router.delete('/deleteInterest', auth, interestValidator.deleteInterest, interest.deleteInterest);
router.post('/getInterests', interest.getInterests);
router.get('/editInterest', auth, interestValidator.deleteInterest, interest.editInterest);
router.post('/updateInterest', auth, interestValidator.updateInterest, interest.updateInterest);
router.get('/updateInterestStatus', interest.updateInterestStatus);

router.post('/createSkill', auth, skillValidator.createSkill, skill.createSkill);
router.delete('/deleteSkill', auth, skillValidator.deleteSkill, skill.deleteSkill);
router.post('/getSkills', skill.getSkills);
router.get('/editSkill', auth, skillValidator.deleteSkill, skill.editSkill);
router.post('/updateSkill', auth, skillValidator.updateSkill, skill.updateSkill);
router.get('/updateSkillStatus', skill.updateSkillStatus);


router.post('/createCollege', collegeValidator.createCollege, college.createCollege);
router.delete('/deleteCollege', auth, collegeValidator.deleteCollege, college.deleteCollege);
router.post('/getColleges', college.getColleges);
router.get('/editCollege', auth, collegeValidator.deleteCollege, college.editCollege);
router.post('/updateCollege', auth, collegeValidator.updateCollege, college.updateCollege);
router.get('/updateCollegeStatus', auth, college.updateCollegeStatus);

router.post('/createCourse',auth,courseValidator.createCourse, course.createCourse);
router.delete('/deleteCourse', auth, courseValidator.deleteCourse, course.deleteCourse);
router.post('/getCourses', course.getCourses);
router.get('/editCourse', auth, courseValidator.deleteCourse, course.editCourse);
router.post('/updateCourse', auth, courseValidator.updateCourse, course.updateCourse);
router.get('/searchCourses', course.searchCourses);
router.get('/getCoursesList', course.getCoursesListAdmin);
router.get('/updateCourseStatus', course.updateCourseStatus);

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