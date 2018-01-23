import { adjustHue } from 'polished'

export const getRoomColor = (roomIndex: number): string => {
  const adjustmentDirection = roomIndex % 2 === 0 ? -30 : 30

  return adjustHue(roomIndex * adjustmentDirection, '#EA526F')
}
