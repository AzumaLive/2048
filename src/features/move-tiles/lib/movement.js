import { BOARD_SIZE } from "@/entities/board/model";

export const getRow = (tiles, rowNum) => {
  const start = rowNum * BOARD_SIZE
  return [tiles[start], tiles[start + 1], tiles[start + 2], tiles[start + 3]]
}

export const getReversedRow = (tiles, rowNum) => {
  const start = rowNum * BOARD_SIZE
  return [tiles[start + 3], tiles[start + 2], tiles[start + 1], tiles[start]]
}

export const getCol = (tiles, colNum) => {
  return [
    tiles[colNum],
    tiles[BOARD_SIZE + colNum],
    tiles[BOARD_SIZE * 2 + colNum],
    tiles[BOARD_SIZE * 3 + colNum]
  ]
}

export const getReversedCol = (tiles, colNum) => {
  return [
    tiles[BOARD_SIZE * 3 + colNum],
    tiles[BOARD_SIZE * 2 + colNum],
    tiles[BOARD_SIZE + colNum],
    tiles[colNum]
  ]
}

export const setRow = (tiles, row, line) => {
  const start = row * BOARD_SIZE
  tiles[start] = line[0]
  tiles[start + 1] = line[1]
  tiles[start + 2] = line[2]
  tiles[start + 3] = line[3]
}

export const setReversedRow = (tiles, row, line) => {
  const start = row * BOARD_SIZE
  tiles[start + 3] = line[0]
  tiles[start + 2] = line[1]
  tiles[start + 1] = line[2]
  tiles[start] = line[3]
}

export const setCol = (tiles, col, line) => {
  tiles[col] = line[0]
  tiles[BOARD_SIZE + col] = line[1]
  tiles[BOARD_SIZE * 2 + col] = line[2]
  tiles[BOARD_SIZE * 3 + col] = line[3]
}

export const setReversedCol = (tiles, col, line) => {
  tiles[BOARD_SIZE * 3 + col] = line[0]
  tiles[BOARD_SIZE * 2 + col] = line[1]
  tiles[BOARD_SIZE + col] = line[2]
  tiles[col] = line[3]
}