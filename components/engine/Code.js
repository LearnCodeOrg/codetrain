import dynamic from 'next/dynamic';

const CodeEditor = dynamic(import('../CodeEditor.js'), { ssr: false });

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
        {
          currObject !== -1 ?
          <>
            <div className={styles.toolbar}>
              <input />
            </div>
            <CodeEditor
              value={currObject === -1 ? '' : codes[currObject]}
              onChange={val => updateCode(val)}
            />
          </> :
          <p className={styles.placeholder}>Select an object to write code.</p>
        }
      </div>
    </div>
  );
}
