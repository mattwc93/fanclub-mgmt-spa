import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NotFoundPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push(`/`)
    }, 5000)
  }

  render() {
    return (
      <div>
        <h1>Page not Found!</h1>
        <h3>Redirecting back to home page in 5 seconds...</h3>
      </div>
    )
  }
}

export default withRouter(NotFoundPage)