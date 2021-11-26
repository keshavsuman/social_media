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
const collegeRoutes = require('./userRoutes/collegeRoutes');
const batchRoutes = require('./userRoutes/batchRoutes');

router.use('/skill',skillRoutes);
router.use('/interest',interestRoutes);
router.use('/post',postRoutes);
router.use('/college',collegeRoutes); //Add college or update college
// add university and update university
router.use('/batch',batchRoutes);

router.post('/search',auth,user.search); 
router.post('/login', userValidator.login, user.login);
router.post('/signup', userValidator.registerUser, user.createUser);
router.post('/socialLogin',user.socialLogin);
router.post('/updateUser',auth,user.updateUser); //Email,status restrict krna hai update ke liye


router.post('/logout', auth, user.logout);
router.post('/forgotPassword', user.forgetPassword);
router.post('/resetPassword', user.resetPassword);

// Search Api
router.get('/searchSkills/:skill',auth,skill.searchSkills);    
router.get('/searchInterests/:interest',auth,interest.searchInterests);
router.get('/searchCollege/:college',auth,college.searchCollege);
router.get('/searchUniversity/:university',auth,university.searchUniversities);


router.get('/getSkillsList', auth, skill.getSkillsList);
router.get('/getUniversitiesList', auth, university.getUniversitiesList);
router.get('/getCoursesList/:collegeId/:h',  course.getCoursesList);
router.get('/getInterestsList', auth, interest.getInterestsList);
router.get('/getCollegesList', auth, college.getCollegesList);

router.get('/countries/:country', profile.countries);
router.get('/states/:countryId/:state', profile.states);
router.get('/cities/:stateId/:city', profile.cities);
router.get('/addCities',profile.addCities);

router.get('/myProfile', auth, profile.myProfile);
router.get('/profile/:id', auth,profileValidator.otherUserProfile, profile.otherUserProfile);
router.post('/setProfile', auth, profile.setProfile);
router.post('/createPost', auth, postValidator.createPost, post.createPost);

router.post('/followUnfollow',auth,userValidator.followunfollowValidator ,user.followunfollow);
router.post('/connectAcceptReject',auth,user.connectAcceptReject);
router.post('/getConnectionRequests',auth,user.getPendingRequests);
router.post('/cancelRequest',auth,user.cancelRequest);
router.get('/getUserRequests',auth,user.getUserRequests);
router.post('/myconnections',auth,user.myconnections);
router.post('/removeConnection',auth,user.removeConnection);
router.post('/peopleYouMayKnow',auth,user.peopleYouMayKnow);
router.post('/getFollowersList',auth,user.getFollowersList);
router.post('/getFollowingsList',auth,user.getFollowingList);
router.post('/notifications',auth,user.getNotifications);
router.post('/deletenotification',auth,user.deleteNotification);

module.exports = router;
