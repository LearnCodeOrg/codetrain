import Link from 'next/link';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Engine from '../../components/engine/Engine';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';

import styles from '../../styles/pages/Engine.module.css';

export default function Edit(props) {
  const [data, setData] = useState(undefined);

  // get project id
  const router = useRouter();
  const { id } = router.query;

  // retrieves project data from firebase
  async function getProjectData() {
    // return if no id
    if (!id) return;
    // get and set project data
    const projectRef = firebase.firestore().collection('projects').doc(id);
    const projectDoc = await projectRef.get();
    setData(projectDoc.exists ? projectDoc.data() : null);
  }

  // get project data on start
  useEffect(() => {
    getProjectData();
  }, [id]);

  return (
    <div className={styles.container}>
      <Header {...props} reload />
      {
        data === undefined ?
        <Loading /> :
        !data ?
        <div className="notfound">
          <h1>Project not found</h1>
          <Link href="/">
            <a className="bluelink">Return home</a>
          </Link>
        </div> :
        <Engine projectId={id} data={data} {...props} />
      }
    </div>
  );
}
