import React, { Component } from 'react';
import { connect } from 'react-redux'
import Student from './Student'

class StudentList extends Component {
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
      </div>
    )
  }
}

const mapState = state => ({
  students: state.students
})

export default connect(mapState)(StudentList)
