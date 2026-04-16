import { BOARD_SIZE, TOTAL_CELLS } from '@/entities/board/model'

export const checkGameOver = (tiles) => {
  for (let i = 1; i <= TOTAL_CELLS; i++) {
    if (!tiles[i - 1].value
      || (i % BOARD_SIZE > 0 && tiles[i - 1].value === tiles[i].value)
      || (i < TOTAL_CELLS - BOARD_SIZE + 1 && tiles[i - 1].value === tiles[i + BOARD_SIZE - 1].value)) {
      return false
    }
  }

  return true
}