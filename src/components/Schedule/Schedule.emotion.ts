import emotion from 'react-emotion'

import { breakpoints } from '../../styles/breakpoints'

import { RoomId } from './lib/get-schedule'

export interface StyledTimetableProps {
  activeRooms: RoomId[]
}

export const Timetable = emotion<StyledTimetableProps, 'div'>('div')(props => {
  return {
    [breakpoints.desktop]: {
      display: 'grid',
      gridTemplateColumns: `80px repeat(${props.activeRooms.length}, 1fr)`,
      gridGap: '1px',
      gridAutoRows: '25px',
    },
  }
})
