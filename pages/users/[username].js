import Link from 'next/link';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Project from '../../components/cards/Project';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/User.module.css';

export default function User(props) {
  const [user, setUser] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [descAbout, setDescAbout] = useState('');
  const [descWork, setDescWork] = useState('');
  const [projects, setProjects] = useState(undefined);

  // get user references
  const usersRef = firebase.firestore().collection('users');
  const userRef = user ? usersRef.doc(user.id) : undefined;
  const uid = firebase.auth().currentUser?.uid;
  const ownPage = uid === user?.id;

  // get username
  const router = useRouter();
  const { username } = router.query;

  // retrieves user uid data from firebase
  async function getUser() {
    // return if no username
    if (!username) return;
    // get and set user data
    const usernameLower = username.toLowerCase();
    const userQuery = usersRef.where('usernameLower', '==', usernameLower);
    const userDocs = (await userQuery.get()).docs;
    // return if no user
    const userDoc = userDocs[0];
    if (!userDoc) {
      setUser(null);
      return;
    }
    // set user
    setUser({ id: userDoc.id, ...userDoc.data() });
    // get user projects
    const projectsRef = firebase.firestore().collection('projects');
    const projectsQuery = projectsRef.where('uid', '==', userDoc.id);
    const projectsDocs = await projectsQuery.get();
    setProjects(projectsDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  // get user data on start
  useEffect(() => {
    getUser();
  }, [username]);

  // refreshes user data
  async function refreshData() {
    // return if no current user
    if (!user) return;
    // retrieve user data
    const userDoc = await userRef.get();
    setUser({ id: userDoc.id, ...userDoc.data() });
  }

  // updates photo in firebase
  async function updatePhoto(photo) {
    const photoRef = firebase.storage().ref(`/photos/${uid}`);
    await photoRef.put(photo);
    const url = await photoRef.getDownloadURL();
    await usersRef.doc(uid).update({ photo: url });
    refreshData();
  }

  // updates descriptions in firebase
  async function updateDescriptions() {
    await userRef.update({ descAbout, descWork });
    refreshData();
  }

  // updates features project in firebase
  async function updateFeatured(featured) {
    await usersRef.doc(uid).update({ featured });
    refreshData();
  }

  // updates private status in firebase
  async function updatePrivate(priv) {
    await usersRef.doc(uid).update({ private: priv });
    refreshData();
  }

  return (
    <div className={styles.container}>
      <Header {...props} />
      {
        user === undefined ?
        <Loading /> :
        !user ?
        <div className="notfound">
          <h1>User not found</h1>
          <Link href="/">
            <a className="bluelink">Return home</a>
          </Link>
        </div> :
        (user.private && !ownPage) ?
        <div className="notfound">
          <h1>This profile is private</h1>
          <Link href="/">
            <a className="bluelink">Return home</a>
          </Link>
        </div> :
        <div className={styles.content}>
          <div className={styles.head}>
            <div>
              <div className={styles.title}>
                {
                  ownPage ?
                  <label>
                    <img src={user.photo} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => updatePhoto(e.target.files[0])}
                      hidden={true}
                    />
                  </label> :
                  <img src={user.photo} />
                }
                <div>
                  <h1>{user.username}</h1>
                  <p>
                    Joined
                    {' '}
                    {
                      new Date(user.joined)
                      .toLocaleDateString(undefined, { month: 'long' })
                    }
                    {' '}
                    {new Date(user.joined).getFullYear()}
                  </p>
                </div>
              </div>
              {
                ownPage &&
                <div>
                  <label>
                    Private profile
                    <input
                      type="checkbox"
                      checked={user.private}
                      onChange={e => updatePrivate(e.target.checked)}
                    />
                  </label>
                </div>
              }
              <div className={styles.description}>
                <div className={styles.fields}>
                  {
                    editing ?
                    <>
                      <div>
                        <h1>About me</h1>
                        <textarea
                          value={descAbout}
                          onChange={e => setDescAbout(e.target.value)}
                          maxLength="2048"
                        />
                      </div>
                      <div>
                        <h1>What I&apos;m working on</h1>
                        <textarea
                          value={descWork}
                          onChange={e => setDescWork(e.target.value)}
                          maxLength="2048"
                        />
                      </div>
                    </> :
                    <>
                      <div>
                        <h1>About me</h1>
                        <p>{user.descAbout}</p>
                      </div>
                      <div>
                        <h1>What I&apos;m working on</h1>
                        <p>{user.descWork}</p>
                      </div>
                    </>
                  }
                </div>
                {
                  ownPage &&
                  (
                    editing ?
                    <button onClick={() => {
                      updateDescriptions();
                      setEditing(false);
                    }}>
                      <SaveIcon />
                    </button> :
                    <button onClick={() => {
                      setDescAbout(user.descAbout ?? '');
                      setDescWork(user.descWork ?? '');
                      setEditing(true);
                    }}>
                      <EditIcon />
                    </button>
                  )
                }
              </div>
            </div>
            {
              !projects ?
              <Loading /> :
              <div className={styles.featured}>
                <p><b>Featured Project</b></p>
                {
                  ownPage &&
                  <select
                    value={user.featured}
                    onChange={e => updateFeatured(e.target.value)}
                  >
                    <option value=""></option>
                    {
                      projects.map(project =>
                        <option
                          value={project.id}
                          key={project.id}
                        >
                          {project.title}
                        </option>
                      )
                    }
                  </select>
                }
                {
                  !user.featured ?
                  <p>No project featured</p> :
                  projects
                  .filter(project => project.id === user.featured)
                  .map(project =>
                    <Project {...project} key={project.id} />
                  )
                }
              </div>
            }
          </div>
          <div className={styles.main}>
            {
              !projects ?
              <Loading /> :
              !projects.length ?
              <p>No projects yet</p> :
              <>
                <p>All projects ({projects.length})</p>
                <div className={styles.projects}>
                  {
                    projects ?
                    !projects.length ?
                    <p>No projects yet</p> :
                    projects.map(project =>
                      <Project {...project} key={project.id} />
                    ) :
                    <Loading />
                  }
                </div>
              </>
            }
          </div>
        </div>
      }
    </div>
  );
}
