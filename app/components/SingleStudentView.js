import React, { Component } from 'react'
import { connect } from 'react-redux'
import Campus from './Campus'
import Student from './Student'
import { selectStudent } from '../reducers/studentReducer'

class SingleStudentView extends Component {

  componentDidMount() {
    const studentId = Number(this.props.match.params.studentId)
    this.props.selectStudent(studentId)
  }

  render() {
    if (!this.props.student.id) {
      return <div>No student with that ID found!</div>
    } else {
      return (
        <div className='container'>
          <h1>Currently Viewed Student:</h1>
          <Student student={this.props.student} />
          <h2>Campus Attended:</h2>
          {
            this.props.student.campus
              ? <Campus campus={this.props.student.campus} singleView={true}/>
              : <h4>This Student is not currently attending one of our campuses!</h4>
          }
        </div>
      )
    }
  }
}

const mapState = state => ({
  student: state.students.selectedStudent
})

const mapDispatch = dispatch => ({
  selectStudent: (id) => dispatch(selectStudent(id))
})

export default connect(mapState, mapDispatch)(SingleStudentView)
