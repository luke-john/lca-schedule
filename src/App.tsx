import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Page } from './components/Page'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Page />
      </Router>
    )
  }
}

export default App
