import * as React from 'react'
import * as format from 'date-fns/format'

import { StyledTimeStart } from './TimeStart.emotion'

export interface Props {
  kind: 'time-start'
  time: string
  dayStart: string
}

export const TimeStart: React.SFC<Props> = props => {
  const humanTime = format(props.time, 'hh:mm a')

  return (
    <StyledTimeStart time={props.time} dayStart={props.dayStart}>
      {humanTime}
    </StyledTimeStart>
  )
}
