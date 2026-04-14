import ActionButton from "@/shared/ui/ActionButton";
import s from './GameOver.module.scss'

const GameOver = (props) => {
  const {
    onReset,
  } = props

  return (
    <div className={s.gameOver}>
      <h3 className={s.title}>Game over!</h3>
      <ActionButton
        className="tryAgainButton"
        onClick={onReset}
      >Try again</ActionButton>
    </div>
  );
};

export default GameOver;