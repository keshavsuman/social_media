const express = require('express');
const router = express.Router();
const auth = require('../../middleware/userAuth');
const postController = require('../../controllers/admin/postController');
const postValidator = require('../../validators/postValidators');

router.use(auth);

router.post('/changeStatus',postController.changePostStatus);
router.post('/adminPostsList',postController.adminPostsList);
router.get('/getPost/:type',postController.adminPostsList);
router.delete('/deletepost',postController.deletePost);

module.exports = router;