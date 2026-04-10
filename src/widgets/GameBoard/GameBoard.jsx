import Tile from "@/shared/ui/Tile/Tile.jsx";
import {useEffect} from "react";
import s from './GameBoard.module.scss'

const GameBoard = (props) => {
  const {
    tiles,
    onRightArrowDown,
    onLeftArrowDown,
    onDownArrowDown,
    onUpArrowDown,
  } = props

  useEffect(() => {
    const onKeyDown = (event) => {
      const { code } = event

      const handlers = {
        ArrowRight: onRightArrowDown,
        ArrowLeft: onLeftArrowDown,
        ArrowUp: onUpArrowDown,
        ArrowDown: onDownArrowDown,
      }[code]

      handlers?.()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown);
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

// <Tile className="tile--2">2</Tile> <Tile className="tile--4">4</Tile> <Tile className="tile--8">8</Tile> <Tile></Tile>
// <Tile className="tile--16">16</Tile> <Tile className="tile--32">32</Tile> <Tile className="tile--64">64</Tile> <Tile></Tile>
// <Tile className="tile--128">128</Tile> <Tile className="tile--256">256</Tile> <Tile className="tile--528">512</Tile> <Tile></Tile>
// <Tile className="tile--1024">1024</Tile> <Tile className="tile--2048">2048</Tile> <Tile></Tile> <Tile></Tile>

export default GameBoard;