import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopCommentedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTopCommentedPosts = async () => {
      try {
        const response = await axios.get('/api/posts/top-commented');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopCommentedPosts();
  }, []);

  return (
    <div>
      <h2>Top 5 Most Commented Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Comment Count: {post.commentCount}</p>   
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCommentedPosts;
