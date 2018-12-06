import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Student from './Student'
// import NewStudentForm from './NewStudentForm';
import { fetchStudents } from '../reducers/studentReducer'


class StudentList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchStudents()
  }

  handleClick() {
    this.props.history.push(`/students/add`)
  }

  render() {
    const students = this.props.students;
    return (
      <React.Fragment>
        <button type='button' onClick={this.handleClick} >ADD A STUDENT</button>
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
      </React.Fragment>
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

