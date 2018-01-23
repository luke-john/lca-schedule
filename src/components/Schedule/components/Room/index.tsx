import * as React from 'react'

import { RoomId } from '../../lib/get-schedule'

import { StyledRoom } from './Room.emotion'

export interface Props {
  room: RoomId
  activeRooms: RoomId[]
  dayStart: string
  dayEnd: string
}

export const Room: React.SFC<Props> = props => {
  return (
    <StyledRoom
      room={props.room}
      activeRooms={props.activeRooms}
      dayStart={props.dayStart}
      dayEnd={props.dayEnd}
    >
      {props.room}
    </StyledRoom>
  )
}
