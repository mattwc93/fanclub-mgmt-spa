import React, { Component } from 'react'
import { connect } from 'react-redux'
import Campus from './Campus'
import Student from './Student'

class SingleStudentView extends Component {
  render() {
    const studentId = Number(this.props.match.params.studentId)
    const [foundStudent] = this.props.students.filter(student => student.id === studentId)
    if (!foundStudent) {
      return <div>No student with that ID found!</div>
    } else {
      return (
        <div className='container'>
          <h1>Currently Viewed Student:</h1>
          <Student student={foundStudent} />
          <h2>Campus Attended:</h2>
          {
            foundStudent.campus
            ? <Campus campus={foundStudent.campus} />
            : <h4>This Student is not currently attending one of our campuses!</h4>
          }
        </div>
      )
    }
  }
}

const mapState = state => ({
  students: state.students
})

export default connect(mapState)(SingleStudentView)
