import Tile from "@/shared/ui/Tile/Tile.jsx";
import {useEffect} from "react";
import s from './GameBoard.module.scss'

const GameBoard = (props) => {
  const {
    tiles,
    arrowDownHandler,
  } = props

  useEffect(() => {
    window.addEventListener('keydown', arrowDownHandler)

    return () => window.removeEventListener('keydown', arrowDownHandler);
  }, [])

  return (
    <div className={s.board}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className={s.cell}></div>
      ))}
      {tiles.map((tile) => (
        <Tile
          className={tile.className}
          value={tile.value}
          key={tile.id}
          position={tile.position}
        ></Tile>
      ))}
    </div>
  );
};

export default GameBoard;