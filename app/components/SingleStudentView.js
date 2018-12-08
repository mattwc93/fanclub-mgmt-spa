import React, { Component } from 'react'
import { connect } from 'react-redux'
import CampusCard from './CampusCard'
import Student from './Student'
import { selectStudent, deleteStudent } from '../reducers/studentReducer'

class SingleStudentView extends Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      redirecting: false
    }
    this.redirectToEditPage = this.redirectToEditPage.bind(this)
    this.submitRemove = this.submitRemove.bind(this)
  }

  redirectToEditPage() {
    this.props.history.push(`/students/update/${this.props.student.id}`)
  }

  async submitRemove() {
    await this.props.removeStudent(this.props.student.id)
    this.setState({
      redirecting: true
    })
    setTimeout(() => {this.props.history.push(`/students`)}, 1500)
  }

  async componentDidMount() {
    const studentId = Number(this.props.match.params.studentId)
    if (isNaN(studentId)) {
      this.props.history.push('/notFound')
    } else {
      await this.props.selectStudent(studentId)
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { student } = this.props
    if (this.state.loading) {
      return <h1>LOADING STUDENT...</h1>
    } else if (this.state.redirecting) {
      return (
        <div>
          <h1>Student Removed.</h1>
          <h2>Returning to Student List...</h2>
        </div>
      )
    } else if (!student.id) {
      return <div>No student with that ID found!</div>
    } else {
      return (
        <div className='container'>
          <h1>Currently Viewed Student:</h1>
          <Student student={student} submitRemove={this.submitRemove} />
          <button type='submit' onClick={this.redirectToEditPage}>EDIT</button>
          <h2>Campus Attended:</h2>
          {
            student.campus
              ? <CampusCard campus={student.campus} singleView={true} />
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
  selectStudent: (id) => dispatch(selectStudent(id)),
  removeStudent: (id) => dispatch(deleteStudent(id))
})

export default connect(mapState, mapDispatch)(SingleStudentView)
