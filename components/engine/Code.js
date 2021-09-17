import dynamic from 'next/dynamic';

const Editor = dynamic(import('../Editor.js'), { ssr: false });

import styles from '../../styles/components/engine/Code.module.css';

export default function Code(props) {
  const { objectCount, currObject, codes, setCodes } = props;

  // updates current color with given value
  function updateCode(val) {
    const newCodes = codes.slice();
    newCodes[currObject] = val;
    setCodes(newCodes);
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.toolbar}>
        </div>
        <Editor
          value={currObject === -1 ? '' : codes[currObject]}
          readOnly={currObject === -1}
          onChange={val => updateCode(val)}
        />
      </div>
    </div>
  );
}
