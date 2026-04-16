import {Link} from "react-router-dom";
import s from "./BackButton.module.scss"

const BackButton = () => {
  return (
    <Link to={"/"}>
      <div className={s.button}>
        <p className={s.title}>Main menu</p>
      </div>
    </Link>
  );
};

export default BackButton;