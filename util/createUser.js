import { defaultPalettes } from '../data/palettes';
import firebase from 'firebase/app';

// attempts to create user with given username
export default async function createUser(username) {
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
  const usersRef = firebase.firestore().collection('users');
  const usernameLower = username.toLowerCase();
  const userQuery = usersRef.where('usernameLower', '==', usernameLower);
  const usernameQuery = await userQuery.get();
  if (usernameQuery.docs.length) {
    alert("Username is taken. Please try another.");
    return;
  }
  // create user documents
  const { uid, photoURL } = firebase.auth().currentUser;
  const userRef = usersRef.doc(uid);
  await userRef.set({
    joined: new Date().getTime(),
    photo: photoURL,
    username: username,
    usernameLower: username.toLowerCase(),
    palettes: defaultPalettes
  });
}
