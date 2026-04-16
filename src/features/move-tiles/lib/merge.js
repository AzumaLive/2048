import { BOARD_SIZE } from "@/entities/board/model";
import { TILE_ANIMATION_CLASSES } from "@/entities/tile/model";
import { createEmptyTile } from "@/entities/tile/model";

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

export const moveAndMerge = (tiles, getLine, setLine) => {
  let hasChanged = false
  let scoreToAdd = 0

  for (let lineIdx = 0; lineIdx < BOARD_SIZE; lineIdx++) {
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
        mergedIds.push(crypto?.randomUUID() ?? `merged-${Date.now()}-${i}`)
        mergedFlags.push(true)
        scoreToAdd += nonZeroValues[i]
        i += 2
      } else {
        merged.push(nonZeroValues[i])
        mergedIds.push(nonZeroIds[i])
        mergedFlags.push(false)
        i++
      }
    }

    while (merged.length < BOARD_SIZE) {
      merged.push(null)
      mergedIds.push(null)
      mergedFlags.push(false)
    }

    if (!arraysEqual(values, merged)) {
      hasChanged = true
    }

    const newLine = merged.map((value, idx) => {
      if (value) {
        const isMerged = mergedFlags[idx]
        const originalPosition = line.find(t => t.value === value)?.position
        const isMoving = originalPosition !== positions[idx]

        return {
          id: mergedIds[idx],
          value,
          position: positions[idx],
          className: isMerged
            ? TILE_ANIMATION_CLASSES.MERGED
            : (isMoving ? TILE_ANIMATION_CLASSES.MOVING : null)
        }
      }
      return createEmptyTile(positions[idx])
    })

    setLine(tiles, lineIdx, newLine)
  }

  return { hasChanged, scoreToAdd }
}

