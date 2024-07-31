import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts', {
          params: { page, search, author, status }
        });
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [page, search, author, status]);

  return (
    <div>
      <h2>Blog Posts</h2>
      <input
        type="text"
        placeholder="Search by title or content"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value="">Filter by author</option>
        {/* Add options dynamically based on available authors */}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Filter by status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setPage(index + 1)} disabled={page === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
