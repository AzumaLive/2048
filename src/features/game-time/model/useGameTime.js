import { useEffect } from "react";
import { useGameSession } from "@/features/game-session";
import { useTimer } from "./useTimer";
import {
  loadSavedTimer,
  useTimerPersistence
} from "@/features/save-game/model/useGamePersistence.js";

const STORAGE_KEY = "time"

const useGameTime = () => {
  const {
    tiles,
    score,
    bestScore,
    isGameOver,
    handleMove,
    resetGame,
  } = useGameSession(STORAGE_KEY)

  const savedTimer = loadSavedTimer(STORAGE_KEY).timer
  const initialTime = savedTimer !== null && savedTimer >= 0 ? savedTimer : 60

  const { timer, startTimer } = useTimer(initialTime)

  useTimerPersistence(timer, STORAGE_KEY)

  useEffect(() => {
    startTimer(initialTime)
  }, []);

  const reset = () => {
    resetGame()
    startTimer(60)
  }

  const isOver = isGameOver || timer === 0

  return {
    tiles,
    score,
    bestScore,
    isOver,
    handleMove,
    reset,
    timer,
  }
}

export default useGameTime