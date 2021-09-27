import Project from '../../components/cards/Project';
import Loading from '../../components/Loading';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/User.module.css';

export default function User() {
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
    const userQuery = usersRef.where('username', '==', username);
    const userDocs = (await userQuery.get()).docs;
    // if no user doc, set data to null
    if (!userDocs.length) setUserData(null);
    // if user data, set data and retrieve projects
    else {
      const data = { id: userDocs[0].id, ...userDocs[0].data() };
      setUserData(data);
      const projectsQuery = projectsRef.where('uid', '==', data.id);
      const projectDocs = (await projectsQuery.get()).docs;
      setProjects(projectDocs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  }

  // get user data on start
  useEffect(() => {
    getUserData();
  }, [username]);

  // return if invalid data
  if (userData === undefined) return <Loading />;
  if (!userData) return <div>User not found</div>;

  return (
    <div>
      <div className={styles.head}>
        <h1>{userData.username}</h1>
        <p>Joined {new Date(userData.joined).toLocaleDateString()}</p>
      </div>
      <div className={styles.projects}>
        {
          projects ?
          projects.map(project =>
            <Project {...project} key={project.id} />
          ) :
          <Loading />
        }
      </div>
    </div>
  );
}
