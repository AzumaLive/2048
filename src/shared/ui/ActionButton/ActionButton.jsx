import s from './Button.module.scss'

const ActionButton = (props) => {
  const {
    type = 'button',
    className = '',
    onClick,
    children
  } = props;

  return (
    <button
      className={`${s.button} ${s[className]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;