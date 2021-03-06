const express = require('express');
const postController = require('../../controllers/user/postController');
const router = express.Router();
const auth = require('../../middleware/userAuth');
const postValidator = require('../../validators/postValidators');
const multer  = require('multer');

const upload = multer({storage: multer.diskStorage({
    destination: '../uploads',
    filename:(req,file,cb)=>{
        var ext = file.originalname.split('.').pop();
        cb(null,Date.now()+'.'+ext);
    },
})});

router.use(auth);


router.get('/getPost',postController.getPosts);
router.post('/post_details',postController.post_details);
router.post('/content',postController.contents);
router.post('/createPost',postController.createPost);
router.post('/updatePost',postController.updatePost);
router.post('/deletePost',postValidator.deletePost,postController.deletePost);
router.put('/generateMediaUploadUrl',upload.single('file'),postController.uploadMedia);
router.post('/react',postController.reactOnPost);
router.post('/comment',postController.comment);
router.post('/getComments',postController.getComments);
router.post('/getCommentsReply',postController.getCommentsReply);
router.post('/replyOnComment',postController.replyOnComment);
router.post('/timelinepost',postController.timelineposts);
router.post('/bookmark',postController.bookmarkPost);
router.get('/getbookmarks',postController.getBookmarks);
router.get('/shareList',postController.shareList);
router.post('/removebookmark',postController.removebookmark);
module.exports = router;
