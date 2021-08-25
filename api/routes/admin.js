const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const interest = require('../controllers/interestController');
const skillValidator = require('../validators/skillValidators');
const collegeValidator = require('../validators/collegeValidators');
const skill = require('../controllers/skillController');
const universityValidator = require('../validators/universityValidators');
const courseValidator = require('../validators/courseValidators');
const university = require('../controllers/universityController');
const college = require('../controllers/collegeController');
const course = require('../controllers/courseController');
const user = require('../controllers/userController');
const post = require('../controllers/postController');

const profile = require('../controllers/profileController');
const dashboard = require('../controllers/dashboardController');
const adminValidator = require('../validators/adminValidators');
const interestValidator = require('../validators/interestValidators');
const auth = require('../middleware/auth');


router.post('/login', adminValidator.login, admin.login);
router.get('/logout', auth, admin.logout);
router.post('/forgotPassword', adminValidator.forgotPassword, admin.forgotPassword);
router.post('/resetPassword', adminValidator.resetPassword, admin.resetPassword);

router.post('/getRoles', auth, admin.getRoles);
router.post('/addRole',auth, adminValidator.addRole, admin.addRole);
router.delete('/deleteRole', auth, adminValidator.deleteRole, admin.deleteRole);
router.get('/editRole', auth, adminValidator.editRole, admin.editRole);
router.get('/roles', auth, admin.roles);
router.post('/updateRole', auth, adminValidator.updateRole, admin.updateRole);
router.get('/updateRoleStatus',auth, adminValidator.updateRoleStatus,admin.updateRoleStatus);


router.post('/admins', auth, admin.admins);
router.get('/editAdmin', auth, adminValidator.editAdmin, admin.editAdmin);
router.post('/createAdmin',adminValidator.createAdmin, admin.createAdmin);
router.post('/updateAdmin', auth, adminValidator.updateAdmin, admin.updateAdmin);
router.delete('/deleteAdmin', auth, adminValidator.deleteAdmin, admin.deleteAdmin);
router.get('/updateAdminStatus', auth, admin.updateAdminStatus);
router.post('/registerAdmin', admin.registerAdmin, adminValidator.registerAdmin);

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

router.post('/createUniversity', auth, universityValidator.createUniversity, university.createUniversity);
router.delete('/deleteUniversity', auth, universityValidator.deleteUniversity, university.deleteUniversity);
router.post('/getUniversities', university.getUniversities);
router.get('/editUniversity', auth, university.editUniversity);
router.post('/updateUniversity', auth, universityValidator.updateUniversity, university.updateUniversity);
router.get('/searchUniversity', university.searchUniversities);
router.get('/getUniversitiesList', university.getUniversitiesListAdmin);
router.get('/updateUniversityStatus', university.updateUniversityStatus);

router.post('/createCollege', auth, collegeValidator.createCollege, college.createCollege);
router.delete('/deleteCollege', auth, collegeValidator.deleteCollege, college.deleteCollege);
router.post('/getColleges', college.getColleges);
router.get('/editCollege', auth, collegeValidator.deleteCollege, college.editCollege);
router.post('/updateCollege', auth, collegeValidator.updateCollege, college.updateCollege);
router.get('/updateCollegeStatus', auth, college.updateCollegeStatus);

router.post('/createCourse', auth, courseValidator.createCourse, course.createCourse);
router.delete('/deleteCourse', auth, courseValidator.deleteCourse, course.deleteCourse);
router.post('/getCourses', course.getCourses);
router.get('/editCourse', auth, courseValidator.deleteCourse, course.editCourse);
router.post('/updateCourse', auth, courseValidator.updateCourse, course.updateCourse);
router.get('/searchCourses', course.searchCourses);
router.get('/getCoursesList', course.getCoursesListAdmin);
router.get('/updateCourseStatus', course.updateCourseStatus);

router.get('/permissionList', admin.permissionList);
router.post('/addPermission', admin.addPermission);

router.post('/users', auth, user.users);
router.get('/editUser', auth, user.editUser);
router.post('/updateUser', auth, user.updateUser);
router.get('/updateUserStatus', auth, user.updateUserStatus);
router.get('/userProfile', profile.userProfile);


router.get('/adminPostsList',post.adminPostsList);
router.get('/changePostStatus',post.changePostStatus);


router.get('/dashboardData', dashboard.dashboardData);

module.exports = router;