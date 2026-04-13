import GameInfo from "@/widgets/GameInfo";
import GameBoard from "@/widgets/GameBoard";
import GameOver from "@/widgets/GameOver";
import {useGameSession} from "@/features/game-session";
import s from './ClassicPage.module.scss'

const ClassicPage = () => {
  const {
    tiles,
    score,
    bestScore,
    resetGame,
    handleMove,
    isGameOver,
  } = useGameSession()

  return (
    <div className={`container ${s.page}`}>
      <GameInfo
        onReset={resetGame}
        score={score}
        bestScore={bestScore}
      />
      <div className={`container ${s.gameArea}`}>
        <GameBoard
          tiles={tiles}
          onMove={handleMove}
        />
        {isGameOver && <GameOver onReset={resetGame}/>}
      </div>
      <p className={s.guide}>
        How to play: Use arrow keys to move tiles.<br/>
        Tiles with the same number merge when they touch.
      </p>
    </div>
  );
};

export default ClassicPage;