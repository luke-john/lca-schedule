import emotion from 'react-emotion'
import * as differenceInMinutes from 'date-fns/difference_in_minutes'

import { breakpoints } from '../../../../styles/breakpoints'

import { roomGridUnits } from '../Room/Room.emotion'

import { RoomId } from '../../lib/get-schedule'
import { getRoomColor } from '../../../../styles/get-room-color'
import { lighten } from 'polished'

export interface SlotProps {
  room: RoomId
  activeRooms: RoomId[]
  talkStart: string
  talkEnd: string
  dayStart: string
}

export interface GetGridRowProps {
  dayStart: string
  talkStart: string
  talkEnd: string
}

const getGridRow = ({ dayStart, talkStart, talkEnd }: GetGridRowProps) => {
  const distanceInMinutes = differenceInMinutes(talkStart, dayStart)

  // row time unit is 5 minutes
  // we also offset room columns
  const startRow = distanceInMinutes / 5 + roomGridUnits

  const talkLength = differenceInMinutes(talkEnd, talkStart)
  const talkRows = talkLength / 5
  const endRow = startRow + talkRows

  return `${startRow} / ${endRow}`
}

export const StyledSlot = emotion<SlotProps, 'div'>('div')(props => {
  const roomIndex = props.activeRooms.indexOf(props.room)
  const roomColor = getRoomColor(roomIndex)

  // offset time column
  const gridColumn = `${roomIndex + 2}`

  const gridRow = getGridRow({
    dayStart: props.dayStart,
    talkStart: props.talkStart,
    talkEnd: props.talkEnd,
  })

  return {
    margin: '2px',
    marginBottom: '10px',

    position: 'relative',

    fontSize: '0px',

    borderRadius: '4px',

    [breakpoints.desktop]: {
      marginBottom: 0,

      padding: '4px',

      gridRow,
      gridColumn,
      background: '#fff',
      border: `1px solid ${roomColor}`,
    },
  }
})

export const StyledByline = emotion('p')({
  marginTop: '1px',
})

export const StyledTitle = emotion('h4')({
  fontSize: '14px',
  margin: '0px',
  lineHeight: '1.5',
  color: '#279AF1',

  // height: 'calc(100% - 21px)',
  overflow: 'hidden',
  [breakpoints.desktop]: {
    fontSize: '12px',
    lineHeight: '1',
  },
})

export const StyledTime = emotion('span')({
  fontSize: '10px',
  color: '#BBB5BD',
})

export const StyledAuthor = emotion('span')({
  fontSize: '10px',
  color: '#070600',
  marginRight: '5px',
})

export interface StyledRoomProps {
  room: RoomId
  activeRooms: RoomId[]
}

export const StyledRoom = emotion<StyledRoomProps, 'p'>('p')(props => {
  const roomIndex = props.activeRooms.indexOf(props.room)
  const roomColor = getRoomColor(roomIndex)

  return {
    display: 'inline-block',
    marginTop: '3px',
    marginBottom: '0px',

    padding: '2px',

    backgroundColor: lighten(0.3, roomColor),
    fontSize: '10px',

    [breakpoints.desktop]: {
      display: 'none',
    },
  }
})

export interface StyledTimeLineProps {
  room: RoomId
  activeRooms: RoomId[]
}

export const StyledTimeLine = emotion<StyledTimeLineProps, 'div'>('div')({
  display: 'none',
})
