import { createStorage } from '@/shared/lib/storage'

const storages = new Map()

export const gameStorageAPI = (storageKey) => {
  if (!storages.has(storageKey)) {
    storages.set(storageKey, {
      tiles: createStorage(`tiles_${storageKey}`),
      score: createStorage(`score_${storageKey}`),
      bestScore: createStorage(`best_score_${storageKey}`),
      timer: createStorage(`timer_${storageKey}`),
    })
  }

  const storage = storages.get(storageKey)

  return {
    saveTiles: (tiles) => storage.tiles.set(tiles),
    saveScore: (score) => storage.score.set(score),
    saveBestScore: (score) => storage.bestScore.set(score),
    saveTimer: (timer) => storage.timer.set(timer),

    loadTiles: () => storage.tiles.get(),
    loadScore: () => storage.score.get(),
    loadBestScore: () => storage.bestScore.get(),
    loadTimer: () => storage.timer.get(),
  }
}