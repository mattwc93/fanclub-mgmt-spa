import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StudentCard from './StudentCard'
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
        <div>
          <div className='listHeader'>
            <h1>ALL STUDENTS:</h1>
            <button type='submit' className='add_btn' onClick={this.handleClick} >ADD A STUDENT</button>
          </div>
          <div className='row wrap studentList'>
            {
              students.length
                ? students.map(student => {
                  return (
                    <StudentCard key={student.id} student={student} />
                  )
                })
                : <h1>NO STUDENTS IN DATABASE</h1>
            }
          </div>
          <a href='#top'>TOP</a>
        </div>
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

