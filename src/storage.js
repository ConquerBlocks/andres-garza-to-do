import { sampleBoard } from './data.js'

export const STORAGE_KEY = 'taskboard:v1'

function isValidBoard(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    value.version === 1 &&
    Array.isArray(value.tasks) &&
    Array.isArray(value.categories)
  )
}

// Returns the persisted board, or the sample board if nothing valid is stored.
export function loadBoard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return sampleBoard
    const parsed = JSON.parse(raw)
    return isValidBoard(parsed) ? parsed : sampleBoard
  } catch {
    return sampleBoard
  }
}

export function saveBoard(board) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board))
  } catch {
    // Storage may be unavailable or full; the app keeps working in memory.
  }
}
