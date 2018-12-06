import React, { Component } from 'react'
import { postStudent } from '../reducers/studentReducer'
import { connect } from 'react-redux'

class NewStudentForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const newStudent = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      gpa: event.target.gpa.value
    }
    this.props.newStudent(newStudent);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW STUDENT:</h2>
        <label htmlFor='firstName'>First Name:</label>
        <input name='firstName' required/>
        <label htmlFor='lastName'>Last Name:</label>
        <input name='lastName' required/>
        <label htmlFor='email'>Email:</label>
        <input name='email' required/>
        <label htmlFor='gpa'>GPA:</label>
        <input name='gpa' type='float' required/>
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newStudent: (student) => dispatch(postStudent(student))
})

export default connect(null, mapDispatch)(NewStudentForm)