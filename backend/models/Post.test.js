const mongoose = require('mongoose');
const Post = require('./Post');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/mern-blog-test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

test('should create a post', async () => {
  const post = new Post({
    title: 'Test Post',
    content: 'This is a test post content',
    author: new mongoose.Types.ObjectId(),
    status: 'published'
  });

  const savedPost = await post.save();
  expect(savedPost._id).toBeDefined();
  expect(savedPost.title).toBe('Test Post');
});

test('should fail to create a post without title', async () => {
  const post = new Post({
    content: 'This is a test post content',
    author: new mongoose.Types.ObjectId(),
    status: 'published'
  });

  await expect(post.save()).rejects.toThrow();
});
