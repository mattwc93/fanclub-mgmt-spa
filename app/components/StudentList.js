import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Student from './Student'
// import NewStudentForm from './NewStudentForm';
import { fetchStudents } from '../reducers/studentReducer'


class StudentList extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchStudents()
    this.setState({
      loading: false
    })
  }

  handleClick() {
    this.props.history.push(`/students/add`)
  }

  render() {
    const students = this.props.students;
    if (this.state.loading) {
      return <h1>LOADING STUDENTS...</h1>
    } else {
      return (
        <React.Fragment>
          <button type='button' onClick={this.handleClick} >ADD A STUDENT</button>
          <div className='container' >
            <h1>LIST OF STUDENTS:</h1>
            <div className='studentList'>
              {
                students.length
                  ? students.map(student => {
                    return (
                      <Student key={student.id} student={student} />
                    )
                  })
                  : <h1>NO STUDENTS IN DATABASE</h1>
              }
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

const mapState = state => ({
  students: state.students.studentList
})

const mapDispatch = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents())
})


export default withRouter(connect(mapState, mapDispatch)(StudentList))

