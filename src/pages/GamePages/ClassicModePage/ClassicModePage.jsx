import GameInfo from "@/widgets/GameInfo/index.js";
import GameBoard from "@/widgets/GameBoard/index.js";
import GameOver from "@/widgets/GameOver/index.js";
import {useGameSession} from "@/features/game-session/index.js";
import s from '../styles/GamePage.module.scss'

const ClassicModePage = () => {
  const {
    tiles,
    score,
    bestScore,
    resetGame,
    handleMove,
    isGameOver,
  } = useGameSession()

  return (
    <div className={`container container--game ${s.page}`}>
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

export default ClassicModePage;