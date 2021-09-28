import { useEffect, useRef } from 'react';

import styles from '../../styles/components/cards/Project.module.css';

let canvas, ctx;

export default function Project(props) {
  const { id, title, username } = props;

  const canvasRef = useRef();

  // on start
  useEffect(() => {
    // get cover canvas
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div className={styles.container}>
      <a href={`/projects/${id}`}>
        <canvas
          ref={canvasRef}
          width={mapPixels}
          height={mapPixels}
        />
      </a>
      <a href={`/projects/${id}`}>
        <h1>{title}</h1>
      </a>
      <a href={`/users/${username}`}>
        <p>{username}</p>
      </a>
    </div>
  );
}
