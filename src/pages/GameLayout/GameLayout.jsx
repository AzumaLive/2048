import BackButton from "@/shared/ui/BackToMenuButton/BackButton.jsx";
import {Outlet} from "react-router-dom";

const GameLayout = () => {
  return (
    <div>
      <BackButton />
      <Outlet />
    </div>
  );
};

export default GameLayout;