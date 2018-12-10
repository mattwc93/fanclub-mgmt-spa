import React, { Component } from 'react'
import { connect } from 'react-redux'
import CampusCard from './CampusCard'
import SingleCampusView from './SingleCampusView'
import Student from './Student'
import { selectStudent, deleteStudent } from '../reducers/studentReducer'
import { withRouter } from 'react-router-dom'

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
    this.props.history.push(`/students/update/${this.props.student.id}/`)
  }

  async submitRemove() {
    await this.props.removeStudent(this.props.student.id)
    this.setState({
      redirecting: true
    })
    setTimeout(() => { this.props.history.push(`/students`) }, 1500)
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
    window.scrollTo(0, 0)
  }

  render() {
    const { student } = this.props
    if (this.state.loading) {
      return <h1>LOADING MEMBER...</h1>
    } else if (this.state.redirecting) {
      return (
        <div className='redirect column' >
          <h1>Member Removed.</h1>
          <h1>Returning to Member List...</h1>
        </div>
      )
    } else if (!student.id) {
      return (
        <div className='redirect column'>
          <h1>No member with that ID found!</h1>
        </div>
      )
    } else {
      return (
        <div>
          <div className='listHeader'>
            <h1>{`${student.firstName} ${student.lastName}`}:</h1>
            <div className='columnRight'>
              <button type='submit' className='add_btn editRmv_btn' onClick={this.redirectToEditPage}>EDIT</button>
              <button type='submit' className='add_btn editRmv_btn' onClick={this.submitRemove}>Remove</button>
            </div>
          </div>
          <Student student={student} />
          <div className='rowCentered' >
            <h1>MEMBER OF:</h1>
          </div >
          <div>
            {
              student.campus
                ? <SingleCampusView singleCampus={student.campus} singleView={true} />
                : <h2>This person is not currently in a fanclub!</h2>
            }
          </div>
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

export default withRouter(connect(mapState, mapDispatch)(SingleStudentView))
