import useGameTime from "@/features/game-time";
import GameInfo from "@/widgets/GameInfo/index.js";
import GameBoard from "@/widgets/GameBoard/index.js";
import GameOver from "@/widgets/GameOver/index.js";
import s from "../styles/GamePage.module.scss";

const TimeModePage = () => {
  const {
    tiles,
    score,
    bestScore,
    reset,
    handleMove,
    isOver,
    timer,
  } = useGameTime()

  return (
    <div className={`container container--game ${s.page}`}>
      <GameInfo
        onReset={reset}
        score={score}
        bestScore={bestScore}
        timer={timer}
      />
      <div className={`container ${s.gameArea}`}>
        <GameBoard
          tiles={tiles}
          onMove={isOver ? undefined : handleMove}
        />
        {isOver && <GameOver onReset={reset} />}
      </div>
      <p className={s.guide}>
        How to play: Use arrow keys to move tiles.<br/>
        Tiles with the same number merge when they touch.
      </p>
    </div>
  );
};

export default TimeModePage;