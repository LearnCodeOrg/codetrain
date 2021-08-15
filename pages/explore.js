import Link from 'next/link';

import firebase from 'firebase/app';

export default function Challenges(props) {
  const { data } = props;

  return (
    <div>
      {
        data.map(project =>
          <div key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <a>
                <h1>{project.title}</h1>
              </a>
            </Link>
            <p>{project.description}</p>
          </div>
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
