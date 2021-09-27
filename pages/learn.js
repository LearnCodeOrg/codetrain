import Loading from '../components/Loading.js';
import Challenge from '../components/cards/Challenge.js';

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import styles from '../styles/pages/Learn.module.css';

export default function Learn(props) {
  const [challenges, setChallenges] = useState(undefined);

  async function getChallenges() {
    // get and set challenges data
    const challengesRef = firebase.firestore().collection('challenges');
    const challengesDocs = (await challengesRef.get()).docs;
    setChallenges(challengesDocs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  // get challenges on start
  useEffect(() => {
    getChallenges();
  }, []);

  if (!challenges) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.challenges}>
        {
          challenges.map(challenge =>
            <Challenge {...challenge} key={challenge.id} />
          )
        }
      </div>
      <a href="/next" className="link">What&apos;s next?</a>
    </div>
  );
}
