import s from './MenuButton.module.scss'
import {Link} from "react-router-dom";

const MenuButton = (props) => {
  const {
    className,
    path,
    name,
    description,
  } = props

  return (
    <Link to={path}>
      <div className={`${s.button} ${s[className]}`}>
        <div className={s.info}>
          <h3 className={s.title}>{name}</h3>
          <p className={s.description}>{description}</p>
        </div>
      </div>
    </Link>
  )
};

export default MenuButton;