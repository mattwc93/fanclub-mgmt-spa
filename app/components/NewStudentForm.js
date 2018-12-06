import React, { Component } from 'react'
import { postStudent } from '../reducers/studentReducer'
import { connect } from 'react-redux'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: '',
}

class NewStudentForm extends Component {
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.newStudent(this.state);
    this.setState(initialState)
  }

  render() {
    const { firstName, lastName, email, gpa } = this.state
    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW STUDENT:</h2>
        <label htmlFor='firstName'>First Name:</label>
        <input name='firstName' value={firstName} onChange={this.handleChange} required />
        <label htmlFor='lastName'>Last Name:<span className="warning">WARNING</span></label>
        <input name='lastName' value={lastName} onChange={this.handleChange} required />
        <label htmlFor='email'>Email:</label>
        <input name='email' value={email} onChange={this.handleChange} required />
        <label htmlFor='gpa'>GPA:</label>
        <input name='gpa' type='float' value={gpa} onChange={this.handleChange} required />
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newStudent: (student) => dispatch(postStudent(student))
})

export default connect(null, mapDispatch)(NewStudentForm)