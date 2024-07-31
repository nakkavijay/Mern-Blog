const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./posts');
const mongoose = require('mongoose');
const Post = require('../models/Post');

const app = express();
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/mern-blog-test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: 'Test Post',
        content: 'This is a test post content',
        status: 'published'
      })
      .expect(201);

    expect(res.body.title).toBe('Test Post');
    expect(res.body.content).toBe('This is a test post content');
  });

  it('should not create a post without title', async () => {
    await request(app)
      .post('/api/posts')
      .send({
        content: 'This is a test post content',
        status: 'published'
      })
      .expect(500);
  });
});
