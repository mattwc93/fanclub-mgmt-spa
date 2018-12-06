import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteStudent } from '../reducers/studentReducer'



class Student extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.removeStudent(this.props.student.id)
  }

  render() {
    const student = this.props.student
    return (
      <div className="studentContainer" >
        <img src={student.imageUrl} className="smallImg" />
        <div>
          <h4>Name: <NavLink to={`/students/${student.id}`}>{student.firstName} {student.lastName}</NavLink></h4>
          <p>Email: {student.email}</p>
          <p>GPA: {student.gpa}</p>
          {
            student.campus && <p>School: <NavLink to={`/campuses/${student.campus.id}`} >{student.campus.name}</NavLink></p>
          }
        </div>
        {
          !this.props.campusView && <button type='button' onClick={this.handleSubmit}>Remove Student</button>
        }
      </div >
    )
  }
}

const mapDispatch = dispatch => ({
  removeStudent: (id) => dispatch(deleteStudent(id))
})

export default connect(null, mapDispatch)(Student)