import Button from "@/shared/ui/Button/index.js";
import s from './GameOver.module.scss'

const GameOver = (props) => {
  const {
    resetBoard,
  } = props

  const onTryAgainButtonClick = () => {
    resetBoard()

  }

  return (
    <div className={s.gameOver}>
      <h3 className={s.title}>Game over!</h3>
      <Button
        className="tryAgainButton"
        onClick={onTryAgainButtonClick}
      >Try again</Button>
    </div>
  );
};

export default GameOver;