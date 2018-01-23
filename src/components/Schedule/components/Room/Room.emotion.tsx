import emotion from 'react-emotion'
import * as differenceInMinutes from 'date-fns/difference_in_minutes'
import { lighten } from 'polished'

import { breakpoints } from '../../../../styles/breakpoints'
import { RoomId } from '../../lib/get-schedule'

import { getRoomColor } from '../../../../styles/get-room-color'

export interface SlotProps {
  room: RoomId
  activeRooms: RoomId[]
  dayStart: string
  dayEnd: string
}

export const roomGridUnits = 3

export const StyledRoom = emotion<SlotProps, 'h2'>('h2')(props => {
  const roomIndex = props.activeRooms.indexOf(props.room)

  const roomColor = getRoomColor(roomIndex)

  // offset time column
  const gridColumn = `${roomIndex + 2}`

  const distanceInMinutes = differenceInMinutes(props.dayEnd, props.dayStart)

  // row time unit is 5 minutes
  // we also offset room columns
  // also add a row at the end
  const endRow = distanceInMinutes / 5 + roomGridUnits + 1

  const gridRow = `1 / ${endRow}`

  return {
    margin: '0px',
    marginBottom: '5px',
    marginRight: '5px',
    padding: '2px',

    fontSize: '13px',
    color: '#070600',

    display: 'inline-block',
    border: `1px solid ${roomColor}`,

    // display: 'none',
    [breakpoints.desktop]: {
      border: 'unset',
      margin: 0,

      gridRow,
      gridColumn,
      display: 'block',
      background: lighten(0.3, roomColor),
    },
  }
})
