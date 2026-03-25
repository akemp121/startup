const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const db = require('./database.js');
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

  await db.createUser(userRecord);

  return userRecord;
}

const verifyAuth = async (req, res, next) => {
  const token = req.cookies['token'];
  const userRecord = await db.getUserToken(token);
  if (userRecord) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// cookie token
async function setAuthCookie(res, userRecord) {
  const newToken = uuid.v4();
  await db.updateUserToken(userRecord.email, newToken);

  res.cookie('token', newToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  });
}

// delete token
async function clearAuthCookie(res, userRecord) {
  await db.removeUserAuth(userRecord);
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
  if (await db.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user!' });
  } else {
    const userRecord = await createUser(req.body.email, req.body.password);
    await setAuthCookie(res, userRecord);
    res.send({ email: userRecord.email });
  }
});

// login
apiRouter.post('/auth/login', async (req, res) => {
  const userRecord = await db.getUser(req.body.email);
  if (userRecord && (await bcrypt.compare(req.body.password, userRecord.pass))) {
    await setAuthCookie(res, userRecord);
    res.send({ email: userRecord.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

// logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await db.getUserToken(token);
  if (userRecord) {
    await clearAuthCookie(res, userRecord);
  }
  res.status(204).end();
});

// getMe
apiRouter.get('/auth/user', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await db.getUserToken(token);
  if (userRecord) {
    res.send({ email: userRecord.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

// add interest
apiRouter.post('/user/interests', async (req, res) => {
  const token = req.cookies['token'];
  const userRecord = await db.getUserToken(token);
  if (userRecord) {
    await db.addUserInterest(userRecord, req.body.interest);
    res.send({ msg: 'Interest added!' });
  } else {
    res.status(401).send({ msg: 'Unauthorized!' });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});