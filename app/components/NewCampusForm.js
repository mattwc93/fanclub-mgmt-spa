import React, { Component } from 'react'
import { postCampus } from '../reducers/campusReducer'
import { connect } from 'react-redux'

const initialState = {
  name: '',
  address: '',
  description: '',
}
class NewCampusForm extends Component {
  constructor() {
    super();
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.newCampus(this.state);
    this.setState(initialState)
    setTimeout(() => {
      this.props.history.push(`/campuses`)
    }, 500)
  }

  render() {
    const { name, address, description } = this.state
    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW CAMPUS:</h2>
        <label htmlFor='name'>Name:</label>
        <input name='name' onChange={this.handleChange} value={name} required />
        <label htmlFor='address'>Address:</label>
        <input name='address' onChange={this.handleChange} value={address} required />
        <label htmlFor='description'>Description:</label>
        <textarea name='description' onChange={this.handleChange} value={description} />
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newCampus: (campus) => dispatch(postCampus(campus))
})

export default connect(null, mapDispatch)(NewCampusForm)