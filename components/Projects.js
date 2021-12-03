import Project from './cards/Project';
import Loading from './Loading';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import styles from '../styles/components/Grid.module.css';

export default function Projects() {
  const [projects, setProjects] = useState(undefined);

  // retrieves projects from firebase
  async function getProjects() {
    const projectsRef = firebase.firestore().collection('projects');
    const projectsQuery = projectsRef
      .orderBy('modified', 'desc')
      .where('featured', '==', true);
    const projectsDocs = (await projectsQuery.get()).docs;
    setProjects(projectsDocs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  // get projects on start
  useEffect(() => {
    getProjects();
  }, []);

  // return if loading
  if (!projects) return <Loading />;

  return (
    <div className={styles.container}>
      {
        projects.map(project =>
          <Project {...project} key={project.id} />
        )
      }
    </div>
  );
}
