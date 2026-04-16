import { useState, useCallback, useEffect } from 'react'
import { createEmptyBoard } from '@/entities/board/model'
import { addRandomTile, checkGameOver } from '../lib'
import {
  getRow, getReversedRow, getCol, getReversedCol,
  setRow, setReversedRow, setCol, setReversedCol,
  moveAndMerge
} from '@/features/move-tiles'
import { useGamePersistence, loadSavedGame } from '@/features/save-game'

export const useGameSession = (storageKey) => {
  const savedGame = loadSavedGame(storageKey)

  const [tiles, setTiles] = useState(savedGame.tiles ?? addRandomTile(createEmptyBoard()))
  const [score, setScore] = useState(savedGame.score ?? 0)
  const [bestScore, setBestScore] = useState(savedGame.bestScore ?? 0)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    setIsGameOver(checkGameOver(tiles))
  }, [tiles]);

  useGamePersistence(tiles, score, bestScore, storageKey)

  useEffect(() => {
    if (score > bestScore) setBestScore(score)
  }, [score, bestScore]);

  const handleMove = useCallback((direction) => {
    let getter, setter

    switch (direction) {
      case 'ArrowRight':
        getter = getReversedRow
        setter = setReversedRow
        break
      case 'ArrowLeft':
        getter = getRow
        setter = setRow
        break
      case 'ArrowUp':
        getter = getCol
        setter = setCol
        break
      case 'ArrowDown':
        getter = getReversedCol
        setter = setReversedCol
        break
      default:
        return
    }

    setTiles(prevTiles => {
      const newTiles = [...prevTiles]
      const { hasChanged, scoreToAdd } = moveAndMerge(newTiles, getter, setter)

      if (hasChanged) {
        setScore(prev => prev + scoreToAdd)
        return addRandomTile(newTiles)
      }

      return prevTiles
    })
  }, [])

  const resetGame = useCallback(() => {
    setTiles(addRandomTile(createEmptyBoard()))
    setScore(0)
    setIsGameOver(false)
  }, [])

  return {
    tiles,
    score,
    bestScore,
    isGameOver,
    handleMove,
    resetGame,
  }
}