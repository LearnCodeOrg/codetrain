import Link from 'next/link';

import firebase from 'firebase/app';

export default function Learn(props) {
  const { data } = props;

  return (
    <div>
      {
        data.map(challenge =>
          <div key={challenge.id}>
            <Link href={`/challenges/${challenge.id}`}>
              <a>
                <h1>{challenge.title}</h1>
              </a>
            </Link>
            <p>{challenge.description}</p>
          </div>
        )
      }
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
