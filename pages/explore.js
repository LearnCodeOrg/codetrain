import Project from '../components/cards/Project.js';

import firebase from 'firebase/app';

import styles from '../styles/Explore.module.css';

export default function Challenges(props) {
  const { data } = props;

  return (
    <div className={styles.projects}>
      {
        data.map(project =>
          <Project {...project} key={project.id} />
        )
      }
    </div>
  );
}

export async function getStaticProps() {
  // get challenge data
  const projectsRef = firebase.firestore().collection('projects');
  const projectsDocs = await projectsRef.get();
  const projectsData = projectsDocs.docs.map(doc => (
    { ...doc.data(), id: doc.id }
  ));
  // return challenge data
  return {
    props: { data: projectsData },
    revalidate: 60
  };
}
