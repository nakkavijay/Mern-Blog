import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostList from './PostList';
import axios from 'axios';

jest.mock('axios');

describe('PostList Component', () => {
  it('should display a list of posts', async () => {
    const posts = [
      { _id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
      { _id: '2', title: 'Post 2', content: 'Content 2', author: 'Author 2' }
    ];

    axios.get.mockResolvedValue({ data: posts });

    render(<PostList />);

    expect(await screen.findByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('should handle error when fetching posts', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<PostList />);

    expect(await screen.findByText('Failed to load posts')).toBeInTheDocument();
  });
});
