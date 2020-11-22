const express = require('express');
const router = express.Router();
const Comment = require('../controller/comments-control');


router.post('/getcomment', Comment.getComment);

router.post('/comment', Comment.postComment);

router.delete('/delete', Comment.deleteComment);

router.put('/edit', Comment.editComment);


module.exports = router;