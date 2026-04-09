import s from './Tile.module.scss';

const Tile = (props) => {
  const {
    className = '',
    value = null,
  } = props

  return (
    <div className={`${s.tile} ${s[className]}`}>
      <p className={s.tileValue}>{value ?? ""}</p>
    </div>
  );
};

export default Tile;