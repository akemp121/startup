const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
app.use(express.json());

const users = [];

async function createUser(email, password) {
  const hashedPass = await bcrypt.hash(password, 10);

  const userRecord = {
    email: email,
    pass: hashedPass
  };

  users.push(userRecord);

  return userRecord;
}

// we're given a field (email or pass), then we find the user based on that
async function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

// registration
app.post('/api/auth', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user!' });
  } else {
    const userRecord = await createUser(req.body.email, req.body.password);
    res.send({ email: userRecord.email });
  }
});

// login
app.put('/api/auth', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

// logout
app.delete('/api/auth', async (req, res) => {
  res.send({});
});

// getMe
app.get('/api/user', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});