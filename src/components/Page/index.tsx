import * as React from 'react'
import { Link, Redirect, Route } from 'react-router-dom'

import { Schedule } from '../Schedule'

import { StyledPage, StyledDayList } from './Page.emotion'

export interface State {
  day: string
}

export interface Props {}

const days = [
  { title: 'monday', date: '2018-01-22' },
  { title: 'tuesday', date: '2018-01-23' },
  { title: 'wednesday', date: '2018-01-24' },
  { title: 'thursday', date: '2018-01-25' },
  { title: 'friday', date: '2018-01-26' },
]

export class Page extends React.Component<Props, State> {
  render() {
    return (
      <StyledPage>
        <h1>Schedule</h1>
        <StyledDayList>
          {days.map((day, index) => (
            <li key={index}>
              <Link to={`/${day.title}`}>{day.title}</Link>
            </li>
          ))}
        </StyledDayList>
        <Route
          path="/:day?"
          render={props => {
            const activeDayDetails = days.find(day => {
              return day.title === props.match.params.day
            })

            if (activeDayDetails === undefined) {
              return <Redirect to="/tuesday" />
            }

            const activeDay = activeDayDetails.date

            return <Schedule activeDay={activeDay} />
          }}
        />
      </StyledPage>
    )
  }
}
