import Link from 'next/link';
import Header from '../../components/Header';
import Project from '../../components/cards/Project';
import Loading from '../../components/Loading';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/User.module.css';

const maxProjects = 16;

export default function User(props) {
  const [userData, setUserData] = useState(undefined);
  const [projects, setProjects] = useState(undefined);

  const usersRef = firebase.firestore().collection('users');
  const projectsRef = firebase.firestore().collection('projects');

  // get username
  const router = useRouter();
  const { username } = router.query;

  // retrieves user data from firebase
  async function getUserData() {
    // return if no username
    if (!username) return;
    // get and set user data
    const userQuery = usersRef
      .where('usernameLower', '==', username.toLowerCase());
    const userDocs = (await userQuery.get()).docs;
    // if no user doc, set data to null
    if (!userDocs.length) setUserData(null);
    // if user data, set data and retrieve projects
    else {
      const data = { id: userDocs[0].id, ...userDocs[0].data() };
      setUserData(data);
      const projectsQuery = projectsRef.where('uid', '==', data.id)
        .orderBy('modified', 'desc').limit(maxProjects);
      const projectDocs = (await projectsQuery.get()).docs;
      setProjects(projectDocs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  }

  // get user data on start
  useEffect(() => {
    getUserData();
  }, [username]);

  return (
    <div className={styles.container}>
      <Header {...props} />
      {
        userData === undefined ?
        <Loading /> :
        !userData ?
        <div className="notfound">
          <h1>User not found</h1>
          <Link href="/">
            <a className="bluelink">Return home</a>
          </Link>
        </div> :
        <>
          <div className={styles.head}>
            <h1>{userData.username}</h1>
            <p>Joined {new Date(userData.joined).toLocaleDateString()}</p>
          </div>
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
  );
}
