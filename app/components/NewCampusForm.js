import React, { Component } from 'react'
import { postCampus } from '../reducers/campusReducer'
import { connect } from 'react-redux'

class NewCampusForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const newCampus = {
      name: event.target.campusName.value,
      address: event.target.address.value,
      description: event.target.description.value
    }
    this.props.newCampus(newCampus);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW CAMPUS:</h2>
        <label htmlFor='campusName'>Name:</label>
        <input name='campusName' required/>
        <label htmlFor='address'>Address:</label>
        <input name='address' required/>
        <label htmlFor='description'>Description:</label>
        <textarea name='description' />
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newCampus: (campus) => dispatch(postCampus(campus))
})

export default connect(null, mapDispatch)(NewCampusForm)