const express = require('express');
const router = express.Router();
const userValidator = require('../validators/userValidators');
const profileValidator = require('../validators/profileValidators');
const postValidator = require('../validators/postValidators');
const user = require('../controllers/userController');
const profile = require('../controllers/profileController');
const auth = require('../middleware/userAuth');
const skill = require('../controllers/skillController');
const course = require('../controllers/courseController');
const college = require('../controllers/collegeController');
const post = require('../controllers/postController');

const skillRoutes = require('./userRoutes/skillRoutes');

const interest = require('../controllers/interestController');
const university = require('../controllers/universityController');

router.use('/skill',skillRoutes);
router.post('/login', userValidator.login, user.login);
router.post('/signup', userValidator.registerUser, user.createUser);
router.post('/socialLogin',userValidator.socialLogin, user.socialLogin);
router.post('/',);

// router.get('/logout', auth, user.logout);
// router.post('/forgotPassword', userValidator.forgotPassword, user.forgotPassword);
router.post('/resetPassword', user.resetPassword);


router.get('/getSkillsList', auth, skill.getSkillsList);
router.get('/getUniversitiesList', auth, university.getUniversitiesList);
router.get('/getCoursesList',  course.getCoursesList);
router.get('/getInterestsList', auth, interest.getInterestsList);
router.get('/getCollegesList', auth, college.getCollegesList);

router.get('/countries', profile.countries);
router.get('/states', profile.states);
router.get('/cities', profile.cities);

router.get('/myProfile', auth, profile.myProfile);
router.get('/profile', profileValidator.otherUserProfile, profile.otherUserProfile);
// router.post('/setProfile', auth, profileValidator.Profile, profile.setProfile);
router.post('/createPost', auth, postValidator.createPost, post.createPost);

module.exports = router;