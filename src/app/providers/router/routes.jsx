import MainMenuPage from "@/pages/MainMenuPage/MainMenuPage.jsx";
import ClassicModePage from "@/pages/GamePages/ClassicModePage/ClassicModePage.jsx";
import TimeModePage from "@/pages/GamePages/TimeModePage/TimeModePage.jsx";
import EndlessModePage from "@/pages/GamePages/EndlessModePage/EndlessModePage.jsx";
import {createBrowserRouter} from "react-router-dom";
import GameLayout from "@/pages/GameLayout/GameLayout.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <MainMenuPage />},
  { path: "/game",
    element: <GameLayout />,
    children: [
      { path: "/game/classic", element: <ClassicModePage />},
      { path: "/game/time", element: <TimeModePage />},
      { path: "/game/endless", element: <EndlessModePage />},
    ],
  },

])