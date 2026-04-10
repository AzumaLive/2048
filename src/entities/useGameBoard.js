import {useCallback, useEffect, useState} from "react";
import gameStorage from '@/shared/api/gameStorage.js'

const useGameBoard = () => {
  const {
    saveTiles,
    saveScore,
    saveBestScore,
    savedTiles,
    savedScore,
    savedBestScore
  } = gameStorage()

  const setRandomTile = (tiles) => {
    let emptyTilesIndexes = []
    tiles.forEach(({ value }, index) => {
      if (!value) emptyTilesIndexes.push(index)
    })

    const randomIndex = emptyTilesIndexes[Math.floor(Math.random() * emptyTilesIndexes.length)]
    tiles[randomIndex] = {
      ...tiles[randomIndex],
      className: "new",
      value: 2,
      id: crypto?.randomUUID() ?? Date.now().toString(),
    }

    return tiles
  }

  const initialTile = (position) => {
    return {
      className: null,
      value: null,
      id: crypto?.randomUUID() ?? Date.now().toString(),
      position,
    }
  }

  const initialTiles = () => {
    let tiles = []
    for (let i = 0; i < 16; ++i) {
      tiles.push(initialTile(i+1))
    }
    return setRandomTile(tiles)
  }

  const [tiles, setTiles] = useState(savedTiles ?? initialTiles())
  const [score, setScore] = useState(savedScore ?? 0)
  const [bestScore, setBestScore] = useState(savedBestScore ?? 0)

  const moveAndMerge = (tiles, getLine, setLine) => {
    let hasChanged = false
    let scoreToAdd = 0

    for (let lineIdx = 0; lineIdx < 4; lineIdx++) {
      const line = getLine(tiles, lineIdx)
      const values = line.map(t => t.value)
      const positions = line.map(t => t.position)

      const nonZeroValues = []
      const nonZeroIds = []

      line.forEach(t => {
        if (t.value) {
          nonZeroValues.push(t.value)
          nonZeroIds.push(t.id)
        }
      })

      const merged = []
      const mergedIds = []
      const mergedFlags = []
      let i = 0

      while (i < nonZeroValues.length) {
        if (i + 1 < nonZeroValues.length && nonZeroValues[i] === nonZeroValues[i + 1]) {
          merged.push(nonZeroValues[i] * 2)
          mergedIds.push(crypto?.randomUUID() ?? Date.now().toString())
          mergedFlags.push(true)
          scoreToAdd += nonZeroValues[i] * 2
          i += 2
        } else {
          merged.push(nonZeroValues[i])
          mergedIds.push(nonZeroIds[i])
          mergedFlags.push(false)
          i++
        }
      }

      while (merged.length < 4) {
        merged.push(null)
        mergedIds.push(null)
        mergedFlags.push(false)
      }

      if (JSON.stringify(values) !== JSON.stringify(merged)) {
        hasChanged = true
      }

      const newLine = merged.map((value, idx) => {
        if (value) {
          const isMerged = mergedFlags[idx]
          const isMoving = line[idx] !== positions[idx]

          return {
            id: mergedIds[idx],
            value,
            position: positions[idx],
            className: isMerged ? "merged" : (isMoving ? "moving" : null)
          }
        }
        return initialTile(positions[idx])
      })

      setLine(tiles, lineIdx, newLine)
    }

    return { hasChanged, scoreToAdd }
  }

  const onRightArrowDown = useCallback(() => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles]
      const { hasChanged, scoreToAdd } = moveAndMerge(
        newTiles,
        (tiles, row) => {
          const start = row * 4
          return [tiles[start + 3], tiles[start + 2], tiles[start + 1], tiles[start]]
        },
        (tiles, row, line) => {
          const start = row * 4
          tiles[start + 3] = line[0]
          tiles[start + 2] = line[1]
          tiles[start + 1] = line[2]
          tiles[start] = line[3]
        }
      )

      if (hasChanged) {
        setScore(prev => prev + scoreToAdd)
        return setRandomTile(newTiles)
      }
      return prevTiles
    })
  }, [])

  const onLeftArrowDown = useCallback(() => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles]
      const { hasChanged, scoreToAdd } = moveAndMerge(
        newTiles,
        (tiles, row) => {
          const start = row * 4
          return [tiles[start], tiles[start + 1], tiles[start + 2], tiles[start + 3]]
        },
        (tiles, row, line) => {
          const start = row * 4
          tiles[start] = line[0]
          tiles[start + 1] = line[1]
          tiles[start + 2] = line[2]
          tiles[start + 3] = line[3]
        }
      )

      if (hasChanged) {
        setScore(prev => prev + scoreToAdd)
        return setRandomTile(newTiles)
      }
      return prevTiles
    })
  }, [])

  const onDownArrowDown = useCallback(() => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles]
      const { hasChanged, scoreToAdd } = moveAndMerge(
        newTiles,
        (tiles, col) => [tiles[12 + col], tiles[8 + col], tiles[4 + col], tiles[col]],
        (tiles, col, line) => {
          tiles[12 + col] = line[0]
          tiles[8 + col] = line[1]
          tiles[4 + col] = line[2]
          tiles[col] = line[3]
        }
      )

      if (hasChanged) {
        setScore(prev => prev + scoreToAdd)
        return setRandomTile(newTiles)
      }
      return prevTiles
    })
  }, [])

  const onUpArrowDown = useCallback(() => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles]
      const { hasChanged, scoreToAdd } = moveAndMerge(
        newTiles,
        (tiles, col) => [tiles[col], tiles[4 + col], tiles[8 + col], tiles[12 + col]],
        (tiles, col, line) => {
          tiles[col] = line[0]
          tiles[4 + col] = line[1]
          tiles[8 + col] = line[2]
          tiles[12 + col] = line[3]
        }
      )

      if (hasChanged) {
        setScore(prev => prev + scoreToAdd)
        return setRandomTile(newTiles)
      }
      return prevTiles
    })
  }, [])

  const isGameOver = useCallback((tiles) => {
    for (let i = 1; i <= 16; ++i) {
      if (!tiles[i-1].value
        || (i % 4 > 0 && tiles[i-1].value === tiles[i].value)
        || (i < 13 && tiles[i-1].value === tiles[i+3].value)) {
        return false
      }
    }
    return true
  }, [])

  const resetBoard = useCallback(() => {
    setTiles(initialTiles())
    setScore(0)
  }, [])

  useEffect(() => {
    saveTiles(tiles)
  }, [tiles]);

  useEffect(() => {
    saveScore(score)
    if (bestScore < score) {
      setBestScore(score)
      saveBestScore(score)
    }
  }, [score]);


  return {
    tiles,
    score,
    bestScore,
    resetBoard,
    setScore,
    onRightArrowDown,
    onLeftArrowDown,
    onDownArrowDown,
    onUpArrowDown,
    isGameOver,
  }
}

export default useGameBoard