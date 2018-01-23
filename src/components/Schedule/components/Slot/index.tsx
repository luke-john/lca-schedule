import * as React from 'react'
import { Fragment } from 'react'
import * as format from 'date-fns/format'

import { ScheduleItem, RoomId } from '../../lib/get-schedule'

import {
  StyledSlot,
  StyledTime,
  StyledTitle,
  StyledAuthor,
  StyledByline,
  StyledRoom,
  StyledTimeLine,
} from './Slot.emotion'

export interface Props {
  activeRooms: RoomId[]
  dayStart: string
  talk: ScheduleItem
}

export const Slot: React.SFC<Props> = (props: Props) => {
  const startTime = format(props.talk.start, 'hh:mm')
  const endTime = format(props.talk.end, 'hh:mm')

  return (
    <Fragment>
      <StyledTimeLine room={props.talk.room} activeRooms={props.activeRooms} />
      <StyledSlot
        activeRooms={props.activeRooms}
        dayStart={props.dayStart}
        room={props.talk.room}
        talkStart={props.talk.start}
        talkEnd={props.talk.end}
      >
        <a href={props.talk.conf_url}>
          <StyledTitle>{props.talk.name}</StyledTitle>
        </a>
        <StyledByline>
          {props.talk.authors && (
            <StyledAuthor>{props.talk.authors.join(', ')}</StyledAuthor>
          )}
          {props.talk.authors && ' '}
          <StyledTime>{`${startTime} - ${endTime}`}</StyledTime>
        </StyledByline>
        <StyledRoom room={props.talk.room} activeRooms={props.activeRooms}>
          {props.talk.room}
        </StyledRoom>
      </StyledSlot>
    </Fragment>
  )
}
