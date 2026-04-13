import GameInfo from "@/widgets/GameInfo";
import GameBoard from "@/widgets/GameBoard";
import useGameBoard from "@/entities/game/module/useGameBoard.js";
import GameOver from "@/widgets/GameOver";
import s from './ClassicPage.module.scss'

const ClassicPage = () => {
  const {
    tiles,
    score,
    bestScore,
    resetBoard,
    arrowDownHandler,
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
          arrowDownHandler={arrowDownHandler}
        />
        {isGameOver(tiles) && <GameOver resetBoard={resetBoard}/>}
      </div>
      <p className={s.guide}>How to play: Use arrow keys to move tiles.<br/>Tiles with the same number merge when they touch.</p>
    </div>
  );
};

export default ClassicPage;