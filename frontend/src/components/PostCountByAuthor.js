import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostCountByAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchPostCountByAuthor = async () => {
      try {
        const response = await axios.get('/api/posts/post-count-by-author');
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostCountByAuthor();
  }, []);

  return (
    <div>
      <h2>Number of Posts by Each Author</h2>
      <ul>
        {authors.map(author => (
          <li key={author.authorId}>
            <h3>{author.authorName}</h3>
            <p>Post Count: {author.postCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCountByAuthor;
