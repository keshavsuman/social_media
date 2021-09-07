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
const post = require('../controllers/user/postController');
const interest = require('../controllers/interestController');
const university = require('../controllers/universityController');

const skillRoutes = require('./userRoutes/skillRoutes');
const interestRoutes = require('../routes/userRoutes/interestRoutes');
const postRoutes = require('./userRoutes/postRoutes');
const universityRoutes = require('./userRoutes/universityRoutes');
const collegeRoutes = require('./userRoutes/collegeRoutes');
const batchRoutes = require('./userRoutes/batchRoutes');

router.use('/skill',skillRoutes);
router.use('/interest',interestRoutes);
router.use('/post',postRoutes);
router.use('/university',universityRoutes);
router.use('/college',collegeRoutes);
router.use('/batch',batchRoutes);

router.post('/search',auth,user.search);
router.post('/login', userValidator.login, user.login);
router.post('/signup', userValidator.registerUser, user.createUser);
router.post('/socialLogin',userValidator.socialLogin, user.socialLogin);
router.post('/updateUser',auth,user.updateUser);


// router.get('/logout', auth, user.logout);
router.get('/forgotPassword', user.forgetPassword);
router.post('/resetPassword', user.resetPassword);

// Search Api
router.get('/searchSkills/:skill',auth,skill.searchSkills);    
router.get('/searchInterests/:interest',auth,interest.searchInterests);
router.get('/searchCollege/:college',auth,college.searchCollege);
router.get('/searchUniversity/:university',auth,university.searchUniversities);
router.get('/searchCourse/:course',auth,course.searchCourses);


router.get('/getSkillsList', auth, skill.getSkillsList);
router.get('/getUniversitiesList', auth, university.getUniversitiesList);
router.get('/getCoursesList',  course.getCoursesList);
router.get('/getInterestsList', auth, interest.getInterestsList);
router.get('/getCollegesList', auth, college.getCollegesList);

router.get('/countries/:country', profile.countries);
router.get('/states/:countryId/:state', profile.states);
router.get('/cities/:stateId/:city', profile.cities);
router.get('/addCities',profile.addCities);

router.get('/myProfile', auth, profile.myProfile);
router.get('/profile/:id', profileValidator.otherUserProfile, profile.otherUserProfile);
router.post('/setProfile', auth, profile.setProfile);
router.post('/createPost', auth, postValidator.createPost, post.createPost);

router.get('/:operation/:id',auth,user.followUnfollowUser);
router.get('/getFollowRequests',auth,user.getPendingRequests);

module.exports = router;

// profile of user in admin 
