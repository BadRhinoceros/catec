import React, { Component } from 'react'; // подключение react
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Statement extends Component {
  render() {
    return(
      <div className="container content-container">
        <div className="content-block">
          <h1>Ведомость</h1>
        </div>
      </div>
    )
  }
}

export { Statement }
