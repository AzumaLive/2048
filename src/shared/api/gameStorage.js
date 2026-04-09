const STORAGE_KEYS = {
  TILES: 'tiles',
  SCORE: 'current_score',
  BEST_SCORE: 'best_score',
}

const gameStorage = () => {

  const saveTiles = (tiles) => localStorage.setItem(STORAGE_KEYS.TILES, JSON.stringify(tiles))
  const saveScore = (score) => localStorage.setItem(STORAGE_KEYS.SCORE, JSON.stringify(score))
  const saveBestScore = (score) => localStorage.setItem(STORAGE_KEYS.BEST_SCORE, JSON.stringify(score))

  const savedTiles = localStorage.getItem(STORAGE_KEYS.TILES)
  const savedScore = localStorage.getItem(STORAGE_KEYS.SCORE)
  const savedBestScore = localStorage.getItem(STORAGE_KEYS.BEST_SCORE)

  return {
    saveTiles,
    saveScore,
    saveBestScore,
    savedTiles: savedTiles ? JSON.parse(savedTiles) : null,
    savedScore: savedScore ? JSON.parse(savedScore) : null,
    savedBestScore: savedBestScore ? JSON.parse(savedBestScore) : null,
  }
}

export default gameStorage;