import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import TopCommentedPosts from './components/TopCommentedPosts';
import PostCountByAuthor from './components/PostCountByAuthor';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/create" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
        <Route path="/posts/edit/:id" element={<ProtectedRoute><PostForm isEdit={true} /></ProtectedRoute>} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/top-commented" element={<TopCommentedPosts />} />
        <Route path="/post-count-by-author" element={<PostCountByAuthor />} />
      </Routes>
    </div>
  );
}

export default App;
