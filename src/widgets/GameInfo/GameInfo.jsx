import ActionButton from "@/shared/ui/ActionButton";
import s from './GameInfo.module.scss'
import Counter from "@/shared/ui/Counter";

const GameInfo = (props) => {
  const {
    onReset,
    score,
    bestScore,
  } = props

  return (
    <div className={s.gameInfo}>
      <h1 className={s.title}>2048</h1>
      <div className={s.counters}>
        <Counter value={score}>SCORE</Counter>
        <Counter value={bestScore}>BEST</Counter>
      </div>
      <h2 className={s.subtitle}>Join the tiles, get to 2048!</h2>
      <ActionButton onClick={onReset}>New Game</ActionButton>
    </div>
  );
};

export default GameInfo;