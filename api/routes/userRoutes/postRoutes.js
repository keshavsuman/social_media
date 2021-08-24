const express = require('express');
const postController = require('../../controllers/user/postController');
const router = express.Router();
const auth = require('../../middleware/userAuth');
const postValidator = require('../../validators/postValidators');
const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });

router.use(auth);

router.get('/getPost',postController.getPosts);
router.post('/createPost',postValidator.createPost,postController.createPost);
router.post('/updatePost',postValidator.updatePost,postController.updatePost);
router.delete('/deletePost',postValidator.deletePost,postController.deletePost);
router.put('/generateMediaUploadUrl',upload.single('file'),postController.uploadMedia);

module.exports = router;
