import Canvas from '../components/Canvas.js';

import dynamic from 'next/dynamic';

import styles from '../styles/Index.module.css';

const Editor = dynamic(import('../components/Editor.js'), { ssr: false });

export default function Index() {
  return (
    <div>
      <Editor />
      <Canvas />
    </div>
  );
}
