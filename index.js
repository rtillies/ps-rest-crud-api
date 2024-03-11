const express = require('express');
const app = express();
const port = 3000;

const users = require('./data/users')
const posts = require('./data/posts')

app.get('/', (req, res) => {
  res.send('Work in progress')
})

/* USERS */
// GET all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// POST user

// GET user by id
app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id == req.params.id) // no {curly braces}
  if(user) res.json(user)
})

// PATCH/PUT user by id

// DELETE user

/* POSTS */
// GET all posts
app.get('/api/posts', (req, res) => {
  res.json(posts)
})

// GET post by id
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id == req.params.id) // no {curly braces}
  if(post) res.json(post)
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})