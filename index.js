const express = require('express');
const app = express();
const port = 3000;

const users = require('./data/users')
const posts = require('./data/posts')

app.get('/', (req, res) => {
  res.send('Work in progress')
})

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// POST user

// GET user by id

// PATCH/PUT user by id

// DELETE user



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})