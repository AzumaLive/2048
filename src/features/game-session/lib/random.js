import { createTile, TILE_ANIMATION_CLASSES } from '@/entities/tile/model'

export const addRandomTile = (tiles) => {
  const newTiles = [...tiles]

  const emptyIndexes = []
  newTiles.forEach(({ value }, index) => {
    if (!value) emptyIndexes.push(index)
  })

  if (emptyIndexes.length === 0) return newTiles

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
  const position = newTiles[randomIndex].position

  newTiles[randomIndex] = createTile(position, 2, TILE_ANIMATION_CLASSES.NEW)

  return newTiles
}