import * as React from 'react'
import * as isToday from 'date-fns/is_today'

import { getSchedule, ScheduleItem } from './lib/get-schedule'

import { Talk } from './components/Talk'

export interface State {
  schedule: ScheduleItem[]
}

export interface Props {}

export class Schedule extends React.Component<Props, State> {
  state: State = {
    schedule: [],
  }

  constructor(props: Props) {
    super(props)

    this.loadState()
  }

  loadState = async () => {
    const schedule = await getSchedule()

    const todaySchedule = schedule.filter(talk => {
      if (!isToday(talk.start)) {
        return false
      }

      return true
    })

    this.setState({ schedule: todaySchedule })
  }

  render() {
    return (
      <div>
        <h1>Schedule</h1>

        <div>
          {this.state.schedule.map((talk, index: number) => {
            return <Talk key={index} talk={talk} />
          })}
        </div>
      </div>
    )
  }
}
