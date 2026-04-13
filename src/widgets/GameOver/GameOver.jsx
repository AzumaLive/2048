import Button from "@/shared/ui/Button";
import s from './GameOver.module.scss'

const GameOver = (props) => {
  const {
    onReset,
  } = props

  return (
    <div className={s.gameOver}>
      <h3 className={s.title}>Game over!</h3>
      <Button
        className="tryAgainButton"
        onClick={onReset}
      >Try again</Button>
    </div>
  );
};

export default GameOver;