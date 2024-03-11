const express = require('express');
const app = express();
const port = 3000;

const users = require('./data/users')
const posts = require('./data/posts')

/* MIDDLEWARE */
// Middleware for 404 error
// app.use((req, res) => {
//   res.status(404);
//   res.json({ error: "Resource Not Found" });
// });

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
app.get('/api/users/:id', (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id) // no {curly braces}
  if(user) res.json(user)
  else next();
})

// PATCH/PUT user by id

// DELETE user

/* POSTS */
// GET all posts
app.get('/api/posts', (req, res) => {
  res.json(posts)
})

// GET post by id
app.get('/api/posts/:id', (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id) // no {curly braces}
  if(post) res.json(post)
  else next();
})

// Middleware for 404 error
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})