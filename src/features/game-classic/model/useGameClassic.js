import {useGameSession} from "@/features/game-session/index.js";

const useGameClassic = () => {
  const {
    tiles,
    score,
    bestScore,
    isGameOver,
    handleMove,
    resetGame,
  } = useGameSession("classic")

  return {
    tiles,
    score,
    bestScore,
    isGameOver,
    handleMove,
    resetGame,
  }
}

export default useGameClassic