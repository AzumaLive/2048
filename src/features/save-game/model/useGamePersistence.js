import {useEffect, useMemo} from 'react'
import { gameStorageAPI } from '../api/gameStorage.js'

export const useGamePersistence = (tiles, score, bestScore, storageKey) => {
  const {
    saveTiles,
    saveBestScore,
    saveScore,
  } = useMemo(() => gameStorageAPI(storageKey), [storageKey])

  useEffect(() => {
    if (tiles) {
      saveTiles(tiles)
    }
  }, [tiles])

  useEffect(() => {
    if (score !== undefined) {
      saveScore(score)
    }
  }, [score])

  useEffect(() => {
    if (bestScore !== undefined) {
      saveBestScore(bestScore)
    }
  }, [bestScore])
}

export const useTimerPersistence = (timer, storageKey) => {
  const {
    saveTimer,
  } = gameStorageAPI(storageKey)

  useEffect(() => {
    if (timer !== undefined) {
      saveTimer(timer)
    }
  }, [timer]);
}

export const loadSavedGame = (storageKey) => {
  const {
    loadTiles,
    loadScore,
    loadBestScore,
  } = gameStorageAPI(storageKey)

  return {
    tiles: loadTiles(),
    score: loadScore(),
    bestScore: loadBestScore(),
  }
}

export const loadSavedTimer = (storageKey) => {
  const {
    loadTimer,
  } = gameStorageAPI(storageKey)

  return {
    timer: loadTimer()
  }
}
