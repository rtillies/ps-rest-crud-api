const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const users = require('./data/users')
const posts = require('./data/posts')

/* MIDDLEWARE */

// BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

app.get('/', (req, res) => {
  res.send('Work in progress')
})

/* USERS */
// GET all users
app.get('/api/users', (req, res, next) => {
  res.json(users)
})

// POST user
app.post('/api/users', (req, res) => {
  if(req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
      res.json({ error: `Username already exists: ${username}`})
      return
    }
    const newUser = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    }
    users.push(newUser)
    res.json(users[users.length - 1])
    console.log(`Successful POST: ${newUser.id} ${newUser.username}`);
  } else {
    res.json({ error: 'Insufficient Data'})
  }
})

// GET user by id
app.get('/api/users/:id', (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id) // no {curly braces}
  if(user) res.json(user)
  else next();
})

// PATCH/PUT user by id
app.patch('/api/users/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const user = users.find((u, i) => {
    // console.log(u.id, req.params.id);
    if (u.id == req.params.id) {
      // console.log(`Found ${u.id}`);
      for (const key in req.body) {
        // console.log('users[i][key]', users[i][key]);
        // console.log('req.body[key]', req.body[key]);
        users[i][key] = req.body[key];
      }
      return true;
    }
  });
  if(user) res.json(user)
  else next();
})

// DELETE user
app.delete('/api/users/:id', (req, res, next) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

/* POSTS */
// GET all posts
app.get('/api/posts', (req, res, next) => {
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