import Header from '../components/Header';
import Loading from '../components/Loading.js';
import Project from '../components/cards/Project.js';
import ExploreIcon from '@mui/icons-material/Explore';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import styles from '../styles/pages/Explore.module.css';

const maxProjects = 36;

export default function Explore(props) {
  const [projects, setProjects] = useState(undefined);

  async function getProjects() {
    // get and set projects data
    const projectsRef = firebase.firestore().collection('projects');
    const projectsQuery = projectsRef.orderBy('modified', 'desc')
    .limit(maxProjects);
    const projectsDocs = (await projectsQuery.get()).docs;
    setProjects(projectsDocs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  // get projects on start
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={styles.container}>
      <Header {...props} />
      <h1><ExploreIcon fontSize="large" />Explore</h1>
      <div className={styles.content}>
        {
          projects ?
          <div className={styles.projects}>
            {
              projects.map(project =>
                <Project {...project} key={project.id} />
              )
            }
          </div> :
          <Loading />
        }
      </div>
    </div>
  );
}
