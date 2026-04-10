import s from './Tile.module.scss';

const Tile = (props) => {
  const {
    className = '',
    value = null,
    position,
  } = props

  const row = Math.ceil(position / 4)
  const col = position % 4 || 4

  return (
    <div
      className={`${s.tile} ${value ? s[`tile--${value}`] : ''} ${className ? s[className] : ''}`}
      style={{
        '--row': row,
        '--col': col
      }}
    >
      {value}
    </div>
  );
};

export default Tile;