import styles from '../../styles/components/cards/Palette.module.css';

export default function Palette(props) {
  const { name, colors, created, uid } = props;

  return (
    <div>
      <p>{name}</p>
      <div>
        {
          colors.map((color, i) =>
            <div
              style={{ background: color }}
              key={i}
            />
          )
        }
      </div>
    </div>
  );
}
