import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NotFoundPage extends Component {
  componentDidMount() {
    this.props.history.push('#top')
    setTimeout(() => {
      this.props.history.push(`/`)
    }, 5000)
  }

  render() {
    return (
      <div className='row'>
        <h1>Page not Found!</h1>
        <h1>Redirecting back to home page in 5 seconds...</h1>
      </div>
    )
  }
}

export default withRouter(NotFoundPage)