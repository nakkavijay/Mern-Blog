const express = require('express');
const { createComment, getCommentsByPost, approveComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getCommentsByPost);
router.put('/approve/:commentId', approveComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
