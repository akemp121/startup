const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
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

// cookie token
function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  });
}

// delete token
function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}

// registration
app.post('/api/auth', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user!' });
  } else {
    const userRecord = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, userRecord);
    res.send({ email: userRecord.email });
  }
});

// login
app.put('/api/auth', async (req, res) => {
  const userRecord = await getUser('email', req.body.email);
  if (userRecord && (await bcrypt.compare(req.body.password, userRecord.pass))) {
    setAuthCookie(res, userRecord);
    res.send({ email: userRecord.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

// logout
app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await getUser('token', token);
  if (userRecord) {
    clearAuthCookie(res, userRecord);
  }
  res.send({});
});

// getMe
app.get('/api/user', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await getUser('token', token);
  if (userRecord) {
    res.send({ email: userRecord.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});