import firebase from 'firebase/app';

// attempts to create user
export default async function createUser() {
  const username = window.prompt('Enter a username:');
  // verify username
  if (!username) {
    alert("Please enter a username.");
    return;
  }
  // verify username chars
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    alert("Username can only contain alphanumeric characters and underscore.");
    return;
  }
  // verify username length
  if (username.length < 2 || username.length > 16) {
    alert("Username must be between 2 and 16 characters.");
    return;
  }
  // verify username availability
  const usernameLower = username.toLowerCase();
  const usernamesRef = firebase.firestore().collection('usernames');
  const usernameRef = usernamesRef.doc(usernameLower);
  const usernameDoc = await usernameRef.get();
  if (usernameDoc.exists) {
    alert("Username is taken. Please try another.");
    return;
  }
  // create user documents
  const { uid, photoURL } = firebase.auth().currentUser;
  const userRef = firebase.firestore().collection('users').doc(uid);
  await userRef.set({ photo: photoURL, username, friends: [] });
  await usernameRef.set({ uid });
}
