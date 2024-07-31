const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  const { postId, content } = req.body;
  try {
    const comment = new Comment({
      post: postId,
      author: req.user._id,
      content
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};

// Get comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

// Approve a comment
exports.approveComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.approved = true;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error approving comment' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
