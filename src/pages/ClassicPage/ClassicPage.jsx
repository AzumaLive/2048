import GameInfo from "@/widgets/GameInfo";
import GameBoard from "@/widgets/GameBoard";
import useGameBoard from "@/entities/useGameBoard.js";
import GameOver from "@/widgets/GameOver";
import s from './ClassicPage.module.scss'

const ClassicPage = () => {
  const {
    tiles,
    score,
    bestScore,
    resetBoard,
    onRightArrowDown,
    onLeftArrowDown,
    onDownArrowDown,
    onUpArrowDown,
    isGameOver,
  } = useGameBoard()

  return (
    <div className={`container ${s.page}`}>
      <GameInfo
        resetBoard={resetBoard}
        score={score}
        bestScore={bestScore}
      />
      <div className={`container ${s.gameArea}`}>
        <GameBoard
          tiles={tiles}
          onRightArrowDown={onRightArrowDown}
          onLeftArrowDown={onLeftArrowDown}
          onDownArrowDown={onDownArrowDown}
          onUpArrowDown={onUpArrowDown}
        />
        {isGameOver(tiles) && <GameOver resetBoard={resetBoard}/>}
      </div>
      <p className={s.guide}>How to play: Use arrow keys to move tiles.<br/>Tiles with the same number merge when they touch.</p>
    </div>
  );
};

export default ClassicPage;