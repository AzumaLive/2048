import Button from "@/shared/ui/Button/index.js";
import s from './GameOver.module.scss'

const GameOver = (props) => {
  const {
    resetBoard,
  } = props

  return (
    <div className={s.gameOver}>
      <h3 className={s.title}>Game over!</h3>
      <Button
        className="tryAgainButton"
        onClick={resetBoard}
      >Try again</Button>
    </div>
  );
};

export default GameOver;