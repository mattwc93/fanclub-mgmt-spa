import React, { Component } from 'react'
import { connect } from 'react-redux'
import Campus from './Campus'
import Student from './Student'

class SingleCampusView extends Component {
  render() {
    const campusId = Number(this.props.match.params.campusId)
    const [foundCampus] = this.props.campuses.filter(campus => campus.id === campusId)
    if (!foundCampus) {
      return <div>No Campus with that ID found!</div>
    } else {
      console.log(foundCampus.students)
      return (
        <div className='container'>
          <h1>Currently Viewed Campus:</h1>
          <Campus campus={foundCampus} />
          <h1>LIST OF STUDENTS:</h1>
          <div className='studentList' >
              {
                foundCampus.students.map(student => <Student key={student.id} student={student} />)
              }
          </div>
        </div>
      )
    }
  }
}

const mapState = state => ({
  campuses: state.campuses
})

export default connect(mapState)(SingleCampusView)
