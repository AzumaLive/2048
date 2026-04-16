let tileIdCounter = 0

const generateTileId = () => {
  return crypto.randomUUID() ?? `${Date.now()}--${tileIdCounter++}`
}

export const createEmptyTile = (position) => {
  return {
    id: generateTileId(),
    value: null,
    className: null,
    position,
  }
}

export const createTile = (position, value, className) => {
  return {
    id: generateTileId(),
    position,
    value,
    className,
  }
}