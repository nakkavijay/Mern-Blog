import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <strong>{comment.author.username}</strong>
            <p>{comment.content}</p>
            <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
