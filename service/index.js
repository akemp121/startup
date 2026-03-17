const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
let apiRouter = express.Router();
app.use(`/api`, apiRouter);
app.use(express.static('public'));

const users = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

async function createUser(email, password) {
  const hashedPass = await bcrypt.hash(password, 10);

  const userRecord = {
    email: email,
    pass: hashedPass
  };

  users.push(userRecord);

  return userRecord;
}

const verifyAuth = async (req, res, next) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

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

/*
// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.jsx', { root: 'public' });
});
*/

// registration
apiRouter.post('/auth/create', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user!' });
  } else {
    const userRecord = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, userRecord);
    res.send({ email: userRecord.email });
  }
});

// login
apiRouter.post('/auth/login', async (req, res) => {
  const userRecord = await getUser('email', req.body.email);
  if (userRecord && (await bcrypt.compare(req.body.password, userRecord.pass))) {
    setAuthCookie(res, userRecord);
    res.send({ email: userRecord.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

// logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await getUser('token', token);
  if (userRecord) {
    clearAuthCookie(res, userRecord);
  }
  res.status(204).end();
});

// getMe
apiRouter.get('/auth/user', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await getUser('token', token);
  if (userRecord) {
    res.send({ email: userRecord.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});