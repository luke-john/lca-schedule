import emotion from 'react-emotion'
import * as differenceInMinutes from 'date-fns/difference_in_minutes'

import { breakpoints } from '../../../../styles/breakpoints'

import { roomGridUnits } from '../Room/Room.emotion'

export interface GetGridRowProps {
  dayStart: string
  time: string
}

const getGridRow = ({ dayStart, time }: GetGridRowProps) => {
  const distanceInMinutes = differenceInMinutes(time, dayStart)

  // row time unit is 5 minutes
  const startRow = distanceInMinutes / 5 + roomGridUnits

  const talkRows = 2
  const endRow = startRow + talkRows

  return `${startRow} / ${endRow}`
}

export interface StyledTimeStartProps {
  time: string
  dayStart: string
}

export const StyledTimeStart = emotion<StyledTimeStartProps, 'h3'>('h3')(
  props => {
    // offset time column
    const gridColumn = 1

    const gridRow = getGridRow({
      dayStart: props.dayStart,
      time: props.time,
    })

    return {
      lineHeight: '2.5',
      borderTop: '1px solid #F7F7FF',

      [breakpoints.desktop]: {
        lineHeight: 'unset',
        borderTop: 'unset',
        marginTop: 0,

        gridRow,
        gridColumn,
      },

      position: 'relative',

      fontSize: '13px',
      margin: '0px',
      color: '#070600',

      padding: '2px',
    }
  },
)
