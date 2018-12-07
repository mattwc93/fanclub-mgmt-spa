import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postStudent } from '../reducers/studentReducer'
import { connect } from 'react-redux'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: '',
  hasSubmitted: false
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

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.newStudent(this.state);
      this.setState(initialState)
      this.props.history.push(`/students`)
    } catch (error) {
      this.setState({
        hasSubmitted: true
      })
    }
  }

  render() {
    const { firstName, lastName, email, gpa } = this.state
    return (
      <form onSubmit={this.handleSubmit} className='campusContainer'>
        <h2>ADD NEW STUDENT:</h2>
        <label htmlFor='firstName'>First Name:
        </label>
        <input name='firstName' value={firstName} onChange={this.handleChange} required />
        <label htmlFor='lastName'>Last Name:
        </label>
        <input name='lastName' value={lastName} onChange={this.handleChange} required />
        <label htmlFor='email'>Email:
          {
            this.state.hasSubmitted && <span className="warning">Email must be of format: example@example.com</span>
          }
        </label>
        <input name='email' value={email} onChange={this.handleChange} required />
        <label htmlFor='gpa'>GPA:
          {
            this.state.hasSubmitted && <span className="warning">GPA must be between 0.0 and 4.0</span>
          }
        </label>
        <input name='gpa' type='float' value={gpa} onChange={this.handleChange} required />
        <button type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  newStudent: (student) => dispatch(postStudent(student))
})

export default withRouter(connect(null, mapDispatch)(NewStudentForm))