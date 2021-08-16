import firebase from 'firebase/app';

export default function Project(props) {
  const { data } = props;

  // return if invalid data
  if (!data) return <div>Project not found</div>;

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
  // get project data
  const projectId = props.params.id;
  const projectsRef = firebase.firestore().collection('projects');
  const projectRef = projectsRef.doc(projectId);
  const projectDoc = await projectRef.get();
  const projectData = projectDoc.exists ?
  { ...projectDoc.data(), id: projectId } : undefined;
  // return project data
  return {
    props: { data: projectData },
    revalidate: 60
  };
}
