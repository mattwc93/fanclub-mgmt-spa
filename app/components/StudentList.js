import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Student from './Student'
import NewStudentForm from './NewStudentForm';
import { fetchStudents } from '../reducers/studentReducer'


class StudentList extends Component {
  componentDidMount() {
    this.props.fetchStudents()
  }
  
  render() {
    const students = this.props.students;
    return (
      <div className='container' >
        <h1>LIST OF STUDENTS:</h1>
        <div className='studentList'>
          {students.map(student => {
            return (
              <Student key={student.id} student={student} />
            )
          })}
        </div>
        <NewStudentForm />
      </div>
    )
  }
}

const mapState = state => ({
  students: state.students.studentList
})
const mapDispatch = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents())
})


export default withRouter(connect(mapState, mapDispatch)(StudentList))

