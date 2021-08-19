import Loading from '../components/Loading.js';
import Project from '../components/cards/Project.js';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import styles from '../styles/pages/Explore.module.css';

export default function Explore() {
  const [projects, setProjects] = useState(undefined);

  async function getProjects() {
    // get and set projects data
    const projectsRef = firebase.firestore().collection('projects');
    const projectsDocs = (await projectsRef.get()).docs;
    setProjects(projectsDocs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  // get projects on start
  useEffect(() => {
    getProjects();
  }, []);

  if (!projects) return <Loading />;

  return (
    <div className={styles.projects}>
      {
        projects.map(project =>
          <Project {...project} key={project.id} />
        )
      }
    </div>
  );
}
