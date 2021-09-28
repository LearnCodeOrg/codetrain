import { useEffect, useRef } from 'react';

import styles from '../../styles/components/cards/Project.module.css';

let canvas, ctx;

export default function Project(props) {
  const { id, title, username } = props;

  const canvasRef = useRef();

  // draws sprite to cover
  function drawSprite(sprite, x, y) {
    // for each pixel
    for (let yp = 0; yp < spriteSize; yp++) {
      for (let xp = 0; xp < spriteSize; xp++) {
        // set fill color
        const colorIndex = yp * spriteSize + xp;
        const color = colors[sprite[colorIndex]];
        ctx.fillStyle = color;
        // get fill position
        let xm = x + xp * pixelPixels;
        let ym = y + yp * pixelPixels;
        // fill pixel
        ctx.fillRect(xm, ym, pixelPixels, pixelPixels);
      }
    }
  }

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
