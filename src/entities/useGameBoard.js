import {useEffect, useState} from "react";
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
    tiles[randomIndex] = { className: "tile--2", value: 2, key: crypto?.randomUUID() ?? Date.now().toString() }

    return tiles
  }

  const initialTile = () => {
    return { className: "", value: null, key: crypto?.randomUUID() ?? Date.now().toString() }
  }

  const initialTiles = () => {
    let tiles = []
    for (let i = 0; i < 16; ++i) {
      tiles.push(initialTile())
    }
    return setRandomTile(tiles)
  }

  const [tiles, setTiles] = useState(savedTiles ?? initialTiles())
  const [score, setScore] = useState(savedScore ?? 0)
  const [bestScore, setBestScore] = useState(savedBestScore ?? 0)

  const moveRowToRight = (tiles, end) => {
    let i = end
    let moved = false
    while (i > end-4) {
      if (tiles[i].value) {
        for (let j = i+1; j <= end && !tiles[j].value; ++j) {
          tiles[j] = tiles[j-1]
          tiles[j-1] = initialTile()
          moved = true
        }
      }
      i--
    }
    return moved
  }

  const moveRowToLeft = (tiles, start) => {
    let i = start
    let moved = false
    while (i < start+4) {
      if (tiles[i].value) {
        for (let j = i-1; j >= start && !tiles[j].value; --j) {
          tiles[j] = tiles[j+1]
          tiles[j+1] = initialTile()
          moved = true
        }
      }
      i++
    }
    return moved
  }

  const moveColumnDown = (tiles, col) => {
    let i = 12 + col
    let moved = false
    while (i >= col) {
      if (tiles[i].value) {
        for (let j = i+4; j <= 12+col && !tiles[j].value; j+=4) {
          tiles[j] = tiles[j-4]
          tiles[j-4] = initialTile()
          moved = true
        }
      }
      i -= 4
    }
    return moved
  }

  const moveColumnUp = (tiles, col) => {
    let i = col
    let moved = false
    while (i <= 12 + col) {
      if (tiles[i].value) {
        for (let j = i-4; j >= col && !tiles[j].value; j-=4) {
          tiles[j] = tiles[j+4]
          tiles[j+4] = initialTile()
          moved = true
        }
      }
      i += 4
    }
    return moved
  }

  const onRightArrowDown = () => {
    let scoreToAdd = 0

    setTiles(prevTiles => {
      let newTiles = prevTiles.map(tile => ({...tile}))
      let hasChanged = false

      for (let i = 3; i < 16; i+=4) {
        if (moveRowToRight(newTiles, i)) hasChanged = true
        for (let j = i; j > i-3; --j) {
          if (newTiles[j].value && newTiles[j-1].value && newTiles[j].value === newTiles[j-1].value) {
            const mergedValue = newTiles[j-1].value * 2
            newTiles[j] = {
              className: `tile--${mergedValue}`,
              value: mergedValue,
              key: crypto?.randomUUID() ?? Date.now().toString()
            }
            newTiles[j-1] = initialTile()
            scoreToAdd += mergedValue
            hasChanged = true
          }
        }
        if (moveRowToRight(newTiles, i)) hasChanged = true
      }
      newTiles = hasChanged ? setRandomTile(newTiles) : newTiles
      saveTiles(newTiles)
      return newTiles
    })
    setScore(prevScore => prevScore + scoreToAdd)
  }

  const onLeftArrowDown = () => {
    let scoreToAdd = 0

    setTiles(prevTiles => {
      let newTiles = prevTiles.map(tile => ({...tile}))
      let hasChanged = false

      for (let i = 0; i < 16; i+=4) {
        if (moveRowToLeft(newTiles, i)) hasChanged = true
        for (let j = i; j < i+3; ++j) {
          if (newTiles[j].value && newTiles[j+1].value && newTiles[j].value === newTiles[j+1].value) {
            const mergedValue = newTiles[j+1].value * 2
            newTiles[j] = {
              className: `tile--${mergedValue}`,
              value: mergedValue,
              key: crypto?.randomUUID() ?? Date.now().toString()
            }
            newTiles[j+1] = initialTile()
            scoreToAdd += mergedValue
            hasChanged = true
          }
        }
        if (moveRowToLeft(newTiles, i)) hasChanged = true
      }
      newTiles = hasChanged ? setRandomTile(newTiles) : newTiles
      saveTiles(newTiles)
      return newTiles
    })
    setScore(prevScore => prevScore + scoreToAdd)
  }

  const onDownArrowDown = () => {
    let scoreToAdd = 0

    setTiles(prevTiles => {
      let newTiles = prevTiles.map(tile => ({...tile}))
      let hasChanged = false

      for (let col = 0; col < 4; col++) {
        if (moveColumnDown(newTiles, col)) hasChanged = true
        for (let j = 12+col; j > col; j-=4) {
          if (newTiles[j].value && newTiles[j-4].value && newTiles[j].value === newTiles[j-4].value) {
            const mergedValue = newTiles[j-4].value * 2
            newTiles[j] = {
              className: `tile--${mergedValue}`,
              value: mergedValue,
              key: crypto?.randomUUID() ?? Date.now().toString()
            }
            newTiles[j-4] = initialTile()
            scoreToAdd += mergedValue
            hasChanged = true
          }
        }
        if (moveColumnDown(newTiles, col)) hasChanged = true
      }
      newTiles = hasChanged ? setRandomTile(newTiles) : newTiles
      return newTiles
    })
    setScore(prevScore => prevScore + scoreToAdd)
  }

  const onUpArrowDown = () => {
    let scoreToAdd = 0

    setTiles(prevTiles => {
      let newTiles = prevTiles.map(tile => ({...tile}))
      let hasChanged = false

      for (let col = 0; col < 4; col++) {
        if (moveColumnUp(newTiles, col)) hasChanged = true
        for (let j = col; j < 12+col; j+=4) {
          if (newTiles[j].value && newTiles[j+4].value && newTiles[j].value === newTiles[j+4].value) {
            const mergedValue = newTiles[j+4].value * 2
            newTiles[j] = {
              className: `tile--${mergedValue}`,
              value: mergedValue,
              key: crypto?.randomUUID() ?? Date.now().toString()
            }
            newTiles[j+4] = initialTile()
            scoreToAdd += mergedValue
            hasChanged = true
          }
        }
        if (moveColumnUp(newTiles, col)) hasChanged = true
      }
      newTiles = hasChanged ? setRandomTile(newTiles) : newTiles
      saveTiles(newTiles)
      return newTiles
    })
    setScore(prevScore => prevScore + scoreToAdd)
  }

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

  const isGameOver = (tiles) => {
    for (let i = 1; i <= 16; ++i) {
      if (!tiles[i-1].value
        || (i % 4 > 0 && tiles[i-1].value === tiles[i].value)
        || (i < 13 && tiles[i-1].value === tiles[i+3].value)) {
        return false
      }
    }
    return true
  }

  const resetBoard = () => {
    setTiles(initialTiles())
    saveTiles(initialTiles())
    setScore(0)
    saveScore(0)
  }

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