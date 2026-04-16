import s from './Timer.module.scss'

const Timer = (props) => {
  const {
    timer,
    timerRef,
  } = props

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60
  const parsedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <div ref={timerRef} className={s.timer}>
      <p className={s.info}>Time left: </p>
      <p className={s.time}>{parsedTime}</p>
    </div>
  );
};

export default Timer;