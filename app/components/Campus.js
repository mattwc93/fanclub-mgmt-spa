import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteCampus } from '../reducers/campusReducer'

class Campus extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.removeCampus(this.props.campus.id)
  }

  render() {
    const campus = this.props.campus
    return (
      <div className="campusContainer">
        <img src={campus.imgUrl} className="smallImg" />
        <h4>Name: <NavLink to={`/campuses/${campus.id}`} >{campus.name}</NavLink></h4>
        <h4>Address: </h4><p>{campus.address}</p>
        <h4>Description:</h4><p> {campus.description}</p>
        {
          !this.props.singleView && <button type='button' onClick={this.handleSubmit}>Remove Campus</button>
        }
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  removeCampus: (id) => dispatch(deleteCampus(id))
})

export default withRouter(connect(null, mapDispatch)(Campus))