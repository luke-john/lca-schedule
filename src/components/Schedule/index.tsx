import * as React from 'react'
import * as isSameDay from 'date-fns/is_same_day'
import * as parse from 'date-fns/parse'
// import * as isTomorrow from 'date-fns/is_tomorrow'

import { getSchedule, ScheduleItem, RoomId } from './lib/get-schedule'

import { Slot } from './components/Slot'
import { TimeStart, Props as TimeStartProps } from './components/TimeStart'
import { Room } from './components/Room'

import { Timetable } from './Schedule.emotion'

export interface UnloadedState {
  loaded: false
}

export interface LoadedState {
  loaded: true
  schedule: Array<ScheduleItem | TimeStartProps>
  activeRooms: RoomId[]
  dayStart: string
  dayEnd: string
}

export type State = UnloadedState | LoadedState

export interface Props {
  activeDay: string
}

const addStartSlots = (
  startTime: string,
  schedule: ScheduleItem[],
): Array<ScheduleItem | TimeStartProps> => {
  let currentStart: string = ''
  let scheduleWithTimeStarts: Array<ScheduleItem | TimeStartProps> = []

  for (const scheduleItem of schedule) {
    if (scheduleItem.start !== currentStart) {
      currentStart = scheduleItem.start
      scheduleWithTimeStarts.push({
        kind: 'time-start',
        time: scheduleItem.start,
        dayStart: startTime,
      })
    }

    scheduleWithTimeStarts.push(scheduleItem)
  }

  return scheduleWithTimeStarts
}

export class Schedule extends React.Component<Props, State> {
  state: State = {
    loaded: false,
  }

  constructor(props: Props) {
    super(props)

    this.loadState(props)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.activeDay !== this.props.activeDay) {
      this.loadState(nextProps)
    }
  }

  loadState = async (props: Props) => {
    const schedule = await getSchedule()

    const todaySchedule = schedule.filter(talk => {
      if (!isSameDay(this.props.activeDay, talk.start)) {
        return false
      }

      return true
    })

    const activeRooms: RoomId[] = todaySchedule.reduce(
      (acc: RoomId[], curr) => {
        if (acc.indexOf(curr.room) !== -1) {
          return acc
        }

        return [...acc, curr.room]
      },
      [],
    )

    let startDate = parse(todaySchedule[0].start)
    let endDate = parse(todaySchedule[0].end)

    for (const scheduleItem of todaySchedule) {
      if (parse(scheduleItem.start) < startDate) {
        startDate = parse(scheduleItem.start)
      }

      if (parse(scheduleItem.end) > endDate) {
        endDate = parse(scheduleItem.end)
      }
    }

    const [dayStart, dayEnd] = [startDate.toUTCString(), endDate.toUTCString()]

    const scheduleWithTimeStarts = addStartSlots(dayStart, todaySchedule)

    this.setState({
      loaded: true,
      schedule: scheduleWithTimeStarts,
      activeRooms,
      dayStart,
      dayEnd,
    })
  }

  render() {
    if (this.state.loaded === false) {
      return <div>loading</div>
    }

    const { dayStart, dayEnd, activeRooms } = this.state

    return (
      <Timetable activeRooms={this.state.activeRooms}>
        {this.state.activeRooms.map((room, index) => {
          return (
            <Room
              key={`room-${index}`}
              room={room}
              dayStart={dayStart}
              dayEnd={dayEnd}
              activeRooms={activeRooms}
            />
          )
        })}

        {this.state.schedule.map((item, index: number) => {
          if (item.kind === 'time-start') {
            return <TimeStart key={`time-${index}`} {...item} />
          }

          return (
            <Slot
              activeRooms={activeRooms}
              dayStart={dayStart}
              key={`slot-${index}`}
              talk={item}
            />
          )
        })}
      </Timetable>
    )
  }
}
