import {TOTAL_CELLS} from "@/entities/board/model/constants.js";
import {createEmptyTile} from "@/entities/tile/model";

export const createEmptyBoard = () => {
  const board = []
  for (let i = 0; i < TOTAL_CELLS; ++i) {
    board.push(createEmptyTile(i+1))
  }
  return board
}