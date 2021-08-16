import firebase from 'firebase/app';

export default function Challenge(props) {
  const { data } = props;

  // return if invalid data
  if (!data) return <div>Challenge not found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps(props) {
  // get challenge data
  const challengeId = props.params.id;
  const challengesRef = firebase.firestore().collection('challenges');
  const challengeRef = challengesRef.doc(challengeId);
  const challengeDoc = await challengeRef.get();
  const challengeData = challengeDoc.exists ?
  { ...challengeDoc.data(), id: challengeId } : undefined;
  // return challenge data
  return {
    props: { data: challengeData },
    revalidate: 60
  };
}
