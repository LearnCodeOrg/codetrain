import Challenge from '../components/cards/Challenge.js';
import Link from 'next/link';

import firebase from 'firebase/app';

import styles from '../styles/Learn.module.css';

export default function Learn(props) {
  const { data } = props;

  return (
    <div className={styles.container}>
      <div className={styles.challenges}>
        {
          data.map(challenge =>
            <Challenge {...challenge} key={challenge.id} />
          )
        }
      </div>
      <Link href="/next">
        <a>What&apos;s next?</a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  // get challenge data
  const challengesRef = firebase.firestore().collection('challenges');
  const challengesDocs = await challengesRef.get();
  const challengesData = challengesDocs.docs.map(doc => (
    { ...doc.data(), id: doc.id }
  ));
  // return challenge data
  return {
    props: { data: challengesData },
    revalidate: 60
  };
}
