const { MongoClient, ObjectId } = require('mongodb');
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
    await userCollection.updateOne({ email: userRecord.email }, { $push: { interests: interest }});
}

// remove a single interest from the user's profile
async function removeUserInterest(userRecord, interest) {
    await userCollection.updateOne({ email: userRecord.email }, { $pull: { interests: interest }});
}

// get all saved interests for a user
async function getUserInterests(userRecord) {
    const userFound = await userCollection.findOne({ email: userRecord.email });

    if (userFound && userFound.interests) {
        return userFound.interests;
    } else {
        return [];
    }
}

// set user difficulty
async function setUserDifficulty(userRecord, difficulty) {
    await userCollection.updateOne({ email: userRecord.email }, { $set: { difficulty: difficulty }});
}

// get user difficulty
async function getUserDifficulty(userRecord) {
    const userFound = await userCollection.findOne({ email: userRecord.email });

    if (userFound && userFound.difficulty) {
        return userFound.difficulty;
    } else {
        return null;
    }
}

// set user target language
async function setUserTargetLanguage(userRecord, language) {
    await userCollection.updateOne({ email: userRecord.email }, { $set: { targetLanguage: language }});
}

// get user target language
async function getUserTargetLanguage(userRecord) {
    const userFound = await userCollection.findOne({ email: userRecord.email });

    if (userFound && userFound.targetLanguage) {
        return userFound.targetLanguage;
    } else {
        return null;
    }
}

// add a word to the user's collection
async function addWord(userRecord, wordRecord) {
    const toInsert = {
        email: userRecord.email,
        text: wordRecord.text,
        translation: wordRecord.translation
    }
    const inserted = await wordCollection.insertOne(toInsert);
    return inserted.insertedId;
}

// get an array of the user's saved words
async function getWords(userRecord) {
    const userWords = await wordCollection.find({ email: userRecord.email }).toArray();
    return userWords;
}

// delete a saved word
async function deleteWord(userRecord, wordID) {
    const objectId = new ObjectId(wordID);
    await wordCollection.deleteOne({ email: userRecord.email, _id: objectId });
}


// export everything
module.exports = {
    getUser,
    getUserToken,
    createUser,
    removeUserAuth,
    updateUserToken,
    addUserInterest,
    removeUserInterest,
    getUserInterests,
    setUserDifficulty,
    getUserDifficulty,
    setUserTargetLanguage,
    getUserTargetLanguage,
    addWord,
    getWords,
    deleteWord
}