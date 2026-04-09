import s from './Counter.module.scss'

const Counter = (props) => {
  const {
    className = '',
    value = 0,
    children
  } = props

  return (
    <div className={`${s.counter} ${s[className]}`}>
      <p className={s.info}>{children}<br/><span className={s.count}>{value}</span></p>
    </div>
  );
};

export default Counter;