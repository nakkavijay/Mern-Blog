import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/comments/${postId}`, { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
