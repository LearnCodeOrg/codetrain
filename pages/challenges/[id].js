import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useState } from 'react';

const Editor = dynamic(import('../../components/Editor.js'), { ssr: false });

export default function Challenge(props) {
  const { data } = props;

  const [code, setCode] = useState(data?.code ?? '');

  // return if invalid data
  if (!data) return <div>Challenge not found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <Editor
        value={code}
        onChange={val => setCode(val)}
      />
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
