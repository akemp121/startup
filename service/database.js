const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('readForeign');
const userCollection = db.collection('user');
const wordCollection = db.collection('word');
const articleCollection = db.collection('article');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// get a user by email
function getUser(email) {
    return userCollection.findOne({ email: email });
}

// we're talking about authToken here
function getUserToken(token) {
    return userCollection.findOne({ token: token});
}

// create a user
async function createUser(userRecord) {
    await userCollection.insertOne(userRecord);
}

// remove user's auth (when they log out)
async function removeUserAuth(userRecord) {
    await userCollection.updateOne({ email: userRecord.email}, { $unset: { token: 1 } });
}

// update the user's token (when they log in)
async function updateUserToken(email, token) {
    await userCollection.updateOne({ email: email}, { $set: { token: token }})
}

// add a single interest to the user's profile
async function addUserInterest(userRecord, interest) {
    await userCollection.updateOne({ email: userRecord.email }, { $push: { interests: interest}});
}



// export everything
module.exports = {
    getUser,
    getUserToken,
    createUser,
    removeUserAuth,
    updateUserToken,
    addUserInterest
}