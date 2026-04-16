import ActionButton from "@/shared/ui/ActionButton";
import Counter from "@/shared/ui/Counter";
import Timer from "@/shared/ui/Timer";
import s from './GameInfo.module.scss'

const GameInfo = (props) => {
  const {
    onReset,
    score,
    bestScore,
    timer = null,
  } = props


  return (
    <div className={s.gameInfo}>
      <h1 className={s.title}>2048</h1>
      <div className={s.counters}>
        <Counter value={score}>SCORE</Counter>
        <Counter value={bestScore}>BEST</Counter>
      </div>
      {timer !== null
        ? <Timer timer={timer} />
        : <h2 className={s.subtitle}>Join the tiles, get to 2048!</h2>}
      <ActionButton
        onClick={onReset}
      >New Game</ActionButton>
    </div>
  );
};

export default GameInfo;