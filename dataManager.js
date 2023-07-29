const firebaseAdmin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account credentials (if not already initialized)
const serviceAccount = require('./url-shortner-f5538-firebase-adminsdk-tsu6z-3a57b64351.json');
console.log(JSON.stringify(serviceAccount));
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    // Add other configuration options as needed
});

const db = firebaseAdmin.firestore();
const urlsCollection = db.collection('urls');

async function addUrl(id, url) {
    try {
        await urlsCollection.doc(id).set({ url });
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function getUrl(id) {
    return urlsCollection.doc(id).get()
        .then((doc) => {
            if (doc.exists) {
                return doc.data().url;
            } else {
                return null;
            }
        });
}
module.exports = {
    addUrl,
    getUrl,
};
