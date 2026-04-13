import {useEffect} from "react";
import Tile from "@/shared/ui/Tile/Tile.jsx";
import s from './GameBoard.module.scss'

const GameBoard = (props) => {
  const {
    tiles,
    onMove,
  } = props

  useEffect(() => {
    const handelKeyDown = (event) => {
      onMove(event.code)
    }

    window.addEventListener('keydown', handelKeyDown)
    return () => window.removeEventListener('keydown', handelKeyDown);
  }, [onMove])

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