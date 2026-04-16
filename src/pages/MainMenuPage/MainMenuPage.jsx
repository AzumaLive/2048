import MenuButton from "@/shared/ui/MenuButton";
import s from './MainMenuPage.module.scss'

const MainMenuPage = () => {


  return (
    <div className={`container container--menu ${s.page}`}>
      <h1 className={s.title}>2048</h1>
      <h2 className={s.subtitle}>Выберите режим игры</h2>
      <ul className={s.gameModesList}>
        <li>
          <MenuButton
            className="classicMode"
            path="/game/classic"
            name="Классический"
            description="Стандартная игра 4×4"
          ></MenuButton>
        </li>
        <li>
          <MenuButton
            className="timeMode"
            path="/game/time"
            name="На время"
            description="Набери максимум очков за 1 минуту"
          ></MenuButton>
        </li>
        <li>
          <MenuButton
            className="endlessMode"
            path="/game/endless"
            name="Бесконечный"
            description="Играй без ограничений"
          ></MenuButton>
        </li>
      </ul>
    </div>
  )
}

export default MainMenuPage