import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Project() {
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
  useEffect(getProjectData, [id]);

  // return if invalid data
  if (data === undefined) return <div>Loading...</div>;
  if (!data) return <div>project not found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
