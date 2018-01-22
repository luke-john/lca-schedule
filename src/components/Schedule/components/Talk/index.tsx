import * as React from 'react'
import * as format from 'date-fns/format'

import { ScheduleItem } from '../../lib/get-schedule'

export interface Props {
  talk: ScheduleItem
}

export const Talk: React.SFC<Props> = (props: Props) => {
  const startTime = format(props.talk.start, 'hh:mm')
  const endTime = format(props.talk.end, 'hh:mm')

  return (
    <div>
      <h2>{props.talk.name}</h2>
      <span>{`${startTime} - ${endTime}`}</span>
    </div>
  )
}
