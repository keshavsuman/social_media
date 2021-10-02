const express  = require('express');
const courseValidator = require('../../validators/courseValidators');
const course = require('../../controllers/courseController');
const auth = require('../../middleware/userAuth');

const router = express.Router();

router.post('/createCourse',auth,courseValidator.createCourse, course.createCourse);
router.delete('/deleteCourse', auth, courseValidator.deleteCourse, course.deleteCourse);
router.post('/getCourses', course.getCourses);
router.get('/editCourse', auth, courseValidator.deleteCourse, course.editCourse);
router.post('/updateCourse', auth, courseValidator.updateCourse, course.updateCourse);
router.get('/searchCourses', course.searchCourses);
router.get('/getCoursesList', course.getCoursesListAdmin);
router.get('/updateCourseStatus', course.updateCourseStatus);

module.exports = router;
